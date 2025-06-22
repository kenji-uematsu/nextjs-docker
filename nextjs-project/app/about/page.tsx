import Link from "next/link";
import { getPosts, getUsers, getJapaneseHolidays } from "../lib/api";
import Counter from "../components/Counter"; // シンプルなimport

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default async function About() {
  // 複数のAPIを並列で取得
  const [posts, users, holidays] = await Promise.all([
    getPosts(),
    getUsers(),
    getJapaneseHolidays(),
  ]);

  // 祝日データを配列に変換（最初の3つ）
  const holidayEntries = Object.entries(holidays).slice(0, 3);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About ページ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Next.jsのサーバーサイドデータフェッチ実例
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            データは全てサーバー側で取得済み
          </p>
        </div>

        {/* Context APIカウンターを追加 */}
        <div className="mb-8">
          <Counter />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* ブログ投稿一覧 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              📝 最新の投稿
            </h2>
            <div className="space-y-3">
              {posts.map((post: Post) => (
                <div
                  key={post.id}
                  className="border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    投稿ID: {post.id}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ユーザー一覧 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-600">
              👥 ユーザー
            </h2>
            <div className="space-y-3">
              {users.map((user: User) => (
                <div
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    @{user.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 日本の祝日 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-red-600">
              🎌 今年の祝日
            </h2>
            <div className="space-y-3">
              {holidayEntries.map(([date, name]: [string, unknown]) => (
                <div
                  key={date}
                  className="border-b border-gray-200 dark:border-gray-700 pb-2"
                >
                  <h3 className="font-medium text-sm text-gray-800 dark:text-white">
                    {String(name)}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            🚀 Next.jsのデータフェッチ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">使用したAPI</h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• JSONPlaceholder（投稿・ユーザー）</li>
                <li>• 日本祝日API</li>
                <li>• 全てサーバーサイドで取得</li>
                <li>• 初期表示時にデータ表示済み</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-2">
                Reactとの違い
              </h3>
              <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                <li>• ローディング状態不要</li>
                <li>• useEffect不要</li>
                <li>• SEOフレンドリー</li>
                <li>• 高速な初期表示</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
