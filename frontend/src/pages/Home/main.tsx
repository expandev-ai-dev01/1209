import { useNavigate } from 'react-router-dom';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary Welcome page for the habit tracker application
 */
export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Gerenciador de Hábitos</h1>
        <p className="text-xl text-gray-600 mb-8">
          Organize seus hábitos e acompanhe seu progresso diário
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Cadastre seus hábitos</h2>
            <p className="text-gray-600 mb-4">
              Crie hábitos personalizados com frequência e horários ideais para realização.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Acompanhe seu progresso</h2>
            <p className="text-gray-600 mb-4">
              Visualize estatísticas detalhadas e mantenha sua sequência de dias consecutivos.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Organize por categorias</h2>
            <p className="text-gray-600 mb-4">
              Agrupe seus hábitos em categorias como saúde, produtividade e lazer.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Receba lembretes</h2>
            <p className="text-gray-600 mb-4">
              Configure notificações para não esquecer de realizar seus hábitos.
            </p>
          </Card>
        </div>

        <div className="text-center">
          <Button size="large" onClick={() => navigate('/habits')}>
            Ver Meus Hábitos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
