import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';

import { SignupSchema } from '@/schemas/schemas';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import asyncError from '@/lib/asyncError';
import generateHash from '@/utils/generateHash';
import { createUser, getUserDetails } from '@/services/user.service';
import { meSelection } from '@/app/api/v1/auth/me/selection';
import { verifyTurnstileToken } from '@/services/auth.service';

const { USER_SIGNUP } = MESSAGES;

const signupHandler = async (req: NextRequest) => {
    const body = await req.json();

    // ✅ Validate request body
    const validation = SignupSchema.safeParse(body);
    if (!validation.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            USER_SIGNUP.VALIDATION_ERROR,
            {},
            validation.error.flatten()
        );
    }

    const { name, email, password, cfToken } = validation.data;

    // ✅ Verify Turnstile token
    const isValid = await verifyTurnstileToken(cfToken);
    if (!isValid) {
        return new Response(
            JSON.stringify({ error: 'Robot verification failed.' }),
            { status: 400 }
        );
    }

    // ✅ Check if user already exists
    const existingUser = await getUserDetails({ email }, meSelection);
    if (existingUser) {
        return sendResponse(httpStatus.CONFLICT, USER_SIGNUP.ALREADY_EXISTS);
    }

    // ✅ Hash password
    const hashedPassword = await generateHash(password);

    // ✅ Create user
    await createUser(
        {
            name,
            email,
            password: hashedPassword,
        },
        {
            id: true,
            name: true,
            email: true,
        }
    );

    // ✅ Return public user types
    return sendResponse(httpStatus.CREATED, USER_SIGNUP.SUCCESS);
};

export const POST = asyncError(signupHandler);
