"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SupabaseConfig_1 = __importDefault(require("../config/SupabaseConfig"));
const caching_1 = require("../utils/caching");
const router = express_1.default.Router();
// GET /api/books
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check cache first
        const cachedBooks = yield (0, caching_1.getCachedData)('books');
        if (cachedBooks) {
            return res.json(cachedBooks);
        }
        // If not in cache, fetch from Supabase
        const { data, error } = yield SupabaseConfig_1.default
            .from('Book')
            .select('*');
        if (error) {
            throw error;
        }
        // Cache the result
        yield (0, caching_1.cacheData)('books', data, 300); // Cache for 5 minutes
        res.json(data);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: error instanceof Error ? error.message : String(error)
        });
    }
}));
exports.default = router;
