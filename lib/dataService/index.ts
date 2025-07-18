import shortUrlModel from '@/lib/dataService/shortUrlRepository';
import clickLogModel from '@/lib/dataService/clickLogRepository';
import userModel from '@/lib/dataService/userRepository';
import tokenModel from '@/lib/dataService/tokenRepository';

const databaseOperation = {
    shortUrlModel,
    clickLogModel,
    userModel,
    tokenModel,
};

export default databaseOperation;
