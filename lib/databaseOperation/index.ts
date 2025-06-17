import shortUrlModel from '@/lib/databaseOperation/shortUrlRepository';
import clickLogModel from '@/lib/databaseOperation/clickLogRepository';
import userModel from '@/lib/databaseOperation/userRepository';

const databaseOperation = {
    shortUrlModel,
    clickLogModel,
    userModel,
};

export default databaseOperation;
