import bcrypt from 'bcrypt';

const generateHash = async (value: string) => {
    return await bcrypt.hash(value, 10);
};

export default generateHash;
