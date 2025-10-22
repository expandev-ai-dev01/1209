/**
 * @page HomePage
 * @summary Welcome page for the habit tracker application
 * @domain core
 * @type landing-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Gerenciador de Hábitos</h1>
        <p className="text-lg text-gray-600">
          Sistema para registrar hábitos e marcar como concluídos
        </p>
        <div className="mt-8">
          <p className="text-sm text-gray-500">Estrutura base criada com sucesso!</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
