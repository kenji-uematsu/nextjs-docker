import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <Image
            className="mx-auto mb-8 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Next.js vs React.js デモtest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Next.jsの機能を体感してみましょう
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              ✅ Next.jsの機能
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 自動画像最適化 (Image コンポーネント)</li>
              <li>• ファイルベースルーティング</li>
              <li>• 自動コード分割</li>
              <li>• TypeScript標準サポート</li>
              <li>• CSS Modules / Tailwind統合</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              ⚙️ 純粋Reactなら必要
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• React Router設定</li>
              <li>• Webpack/Vite設定</li>
              <li>• 画像最適化ライブラリ</li>
              <li>• TypeScript設定</li>
              <li>• CSS処理設定</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            About ページへ（ファイルベースルーティング）
          </Link>
        </div>
      </main>
    </div>
  );
}
