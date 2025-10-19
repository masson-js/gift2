import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getGiftWishesByClass } from '@/actions/giftWish';

// Define the shape of a gift wish record, aligned with Prisma schema
interface GiftWish {
  id: string;
  name: string;
  class: string;
  age: number;
  giftWish: string;
  giftLink: string | null;
  createdAt: Date;
}

// Define the return type for getGiftWishesByClass
interface GetGiftWishesResult {
  success: boolean;
  data?: { [className: string]: GiftWish[] };
  error?: string;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const resolvedSearchParams = await searchParams;
  const password = resolvedSearchParams?.password ?? '';
  const session = resolvedSearchParams?.s ?? '';
  const correctPassword = process.env.PASSWORD ?? '';

  // Если введен пароль - проверяем и делаем редирект с рандомным числом
  if (password) {
    if (password === correctPassword) {
      const randomSession = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      redirect(`/admin?s=${randomSession}`);
    } else {
      // Неправильный пароль - показываем форму с ошибкой
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
              🔒 Wprowadź hasło
            </h1>
            <form action="/admin" method="GET" className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Hasło
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200"
                />
              </div>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                Nieprawidłowe hasło
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
              >
                Zaloguj się
              </button>
            </form>
          </div>
        </div>
      );
    }
  }

  // Если нет ни пароля, ни сессии - показываем форму
  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
            🔒 Wprowadź hasło
          </h1>
          <form action="/admin" method="GET" className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Hasło
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200"
              />
            </div>
            {correctPassword === '' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                Brak hasła w konfiguracji serwera
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Если есть сессия - показываем данные
  const wishesResult: GetGiftWishesResult = await getGiftWishesByClass();
  if (!wishesResult.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {wishesResult.error || 'Wystąpił błąd podczas pobierania życzeń'}
          </div>
        </div>
      </div>
    );
  }

  const groupedWishes: { [className: string]: GiftWish[] } = wishesResult.data!;
  const classes: string[] = Object.keys(groupedWishes).sort();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            🎅 Lista życzeń uczniów
          </h1>
          <p className="text-gray-600">
            Wszystkie życzenia dla Świętego Mikołaja
          </p>
        </div>

        {classes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-500 text-lg">
              Jeszcze nie ma żadnych życzeń 🎄
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {classes.map((className) => (
              <div key={className} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">
                    Klasa {className}
                  </h2>
                  <p className="text-red-100">
                    {groupedWishes[className].length}{' '}
                    {groupedWishes[className].length === 1 ? 'uczeń' : 'uczniów'}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Imię
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wiek
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Prezent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Link
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {groupedWishes[className].map((wish: GiftWish) => (
                        <tr key={wish.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {wish.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {wish.age} lat
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-md">
                              {wish.giftWish}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {wish.giftLink ? (
                              <a
                                href={wish.giftLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                🔗 Link
                              </a>
                            ) : (
                              <span className="text-gray-400 text-sm">Brak</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(wish.createdAt).toLocaleDateString('pl-PL')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            ← Powrót do formularza
          </Link>
        </div>
      </div>
    </div>
  );
}