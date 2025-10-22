import { useNavigate } from 'react-router-dom';
import { Button } from '@/core/components';

/**
 * @page NotFoundPage
 * @summary 404 error page for non-existent routes
 * @domain core
 * @type error-page
 * @category public
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mb-2 text-2xl font-semibold text-gray-700">Página não encontrada</h2>
        <p className="mb-8 text-gray-600">A página que você está procurando não existe.</p>
        <Button onClick={() => navigate('/')} variant="primary">
          Voltar para o início
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
