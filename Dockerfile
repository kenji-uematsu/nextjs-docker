# ビルドステージ
FROM node:18-bullseye AS builder

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピー
COPY nextjs-project/package.json nextjs-project/package-lock.json ./

# 依存関係をインストール
RUN npm ci

# アプリケーションコードをコピー
COPY nextjs-project ./

RUN npm run build

# 実行ステージ
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 必要なポートを公開
EXPOSE 3000

# 本番サーバーを起動
CMD ["npm", "start"]