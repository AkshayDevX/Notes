"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = __importDefault(require("./middlewares/error"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// serve static files
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// routes
app.use('/api/v1', userRoutes_1.default);
app.use('/api/v1', noteRoutes_1.default);
// Catch-all route to serve the React app
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist", "index.html"));
});
// error middleware
app.use(error_1.default);
const port = process.env.PORT || 8000;
// Start the server
app.listen(port, () => {
    console.log(`🔥 Server is listening on port ${port}`);
});
//# sourceMappingURL=server.js.map