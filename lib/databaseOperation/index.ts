import shortUrlModel from '@/lib/databaseOperation/shortUrlRepository';
import clickLogModel from '@/lib/databaseOperation/clickLogRepository';
import userModel from '@/lib/databaseOperation/userRepository';
import tokenModel from '@/lib/databaseOperation/tokenRepository';

const databaseOperation = {
    shortUrlModel,
    clickLogModel,
    userModel,
    tokenModel,
};

export default databaseOperation;
