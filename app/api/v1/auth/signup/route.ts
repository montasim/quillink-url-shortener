import { NextRequest } from 'next/server';
import httpStatus from 'http-status-lite';

import { SignupSchema } from '@/schemas/schemas';
import sendResponse from '@/utils/sendResponse';
import MESSAGES from '@/constants/messages';
import dataService from '@/lib/databaseOperation';
import asyncError from '@/lib/asyncError';
import hashPassword from '@/utils/hashPassword';

const { USER_SIGNUP_MESSAGES } = MESSAGES;
const { userModel } = dataService;

const signupHandler = async (req: NextRequest) => {
    const body = await req.json();

    // ✅ Validate request body
    const validation = SignupSchema.safeParse(body);
    if (!validation.success) {
        return sendResponse(
            httpStatus.BAD_REQUEST,
            USER_SIGNUP_MESSAGES.VALIDATION_ERROR,
            {},
            validation.error.flatten()
        );
    }

    const { name, email, password } = validation.data;

    // ✅ Check if user already exists
    const existingUser = await userModel.findUnique({ where: { email } });
    if (existingUser) {
        return sendResponse(
            httpStatus.CONFLICT,
            USER_SIGNUP_MESSAGES.ALREADY_EXISTS
        );
    }

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Create user
    const newUser = await userModel.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    // ✅ Return public user data
    return sendResponse(httpStatus.CREATED, USER_SIGNUP_MESSAGES.CREATED);
};

export const POST = asyncError(signupHandler);
