import shortUrlModel from '@/lib/databaseOperation/shortUrlRepository';
import clickLogModel from '@/lib/databaseOperation/clickLogRepository';

const databaseOperation = {
    shortUrlModel,
    clickLogModel,
};

export default databaseOperation;
