// JSONPlaceholder API（テスト用の無料API）を使用
export async function getPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function getUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users?_limit=3"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// 日本の祝日API（無料）
export async function getJapaneseHolidays() {
  const currentYear = new Date().getFullYear();
  const response = await fetch(
    `https://holidays-jp.github.io/api/v1/${currentYear}/date.json`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch holidays");
  }
  return response.json();
}
