import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

export default function ActionButton(
    {
        targetText,
        className,
        onClick,
        ...props
    }: {
        targetText: string;
        className?: string;
        onClick?: () => void;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [text, setText] = useState(targetText);

    const scramble = () => {
        let pos = 0;

        intervalRef.current = setInterval(() => {
            const scrambled = targetText.split("")
                .map((char, index) => {
                    if (pos / CYCLES_PER_LETTER > index) {
                        return char;
                    }

                    const randomCharIndex = Math.floor(Math.random() * CHARS.length);
                    const randomChar = CHARS[randomCharIndex];

                    return randomChar;
                })
                .join("");

            setText(scrambled);
            pos++;

            if (pos >= targetText.length * CYCLES_PER_LETTER) {
                stopScramble();
            }
        }, SHUFFLE_TIME);
    };

    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);

        setText(targetText);
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.01,
                transition: { duration: 0.1, ease: "easeInOut" },
            }}
            whileTap={{
                scale: 0.975,
            }}
            onMouseEnter={scramble}
            onMouseLeave={stopScramble}
            className={cn("group relative w-full overflow-hidden uppercase transition-colors", className)}
        >
            {/* <Button onClick={onClick} {...props} className="relative z-10 flex items-center gap-2 w-full">
                <Link />
                <span>{text}</span>
            </Button> */}
            <button onClick={onClick} {...props} className="relative cursor-pointer w-full z-10 inline-flex h-12 overflow-hidden rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <p className="inline-flex h-full w-full gap-2.5 items-center justify-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground backdrop-blur-3xl">
                    <Link className="w-4 h-4"/>
                    <span>{text}</span>
                </p>
                <motion.span
                initial={{
                    y: "100%",
                }}
                animate={{
                    y: "-100%",
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 1,
                    ease: "linear",
                }}
                className="duration-300 absolute inset-0 z-50 scale-125 bg-gradient-to-t from-transparent from-90% to-indigo-400 to-90% opacity-0 transition-opacity group-hover:opacity-100"
            />
            </button>
            
        </motion.div>
    );
};

