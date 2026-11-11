export async function fetchErpSites({ endpoint, token, fetcher = fetch }) {
  if (!token) throw new Error('Не задан серверный ERP_SITE_TOKEN для API сайтов.');
  let response;
  try {
    response = await fetcher(endpoint, {
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new Error('Не удалось подключиться к ERP сайтов. Повторите попытку позже.');
  }
  if (response.status === 401 || response.status === 403) {
    throw new Error(
      'ERP сайтов отклонил авторизацию (' +
        response.status +
        '). Проверьте серверный ERP_SITE_TOKEN.',
    );
  }
  if (!response.ok) throw new Error('ERP сайтов вернул ошибку (' + response.status + ').');
  try {
    return await response.json();
  } catch {
    throw new Error('ERP сайтов вернул некорректный JSON.');
  }
}
