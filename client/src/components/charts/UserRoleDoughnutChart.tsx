import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import type { UserType } from "../../typescript/user";

ChartJS.register(ArcElement, Tooltip, Legend);

type UserRoleDoughnutChartProps = {
  users: UserType[];
};

const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    const total = chart.data.datasets[0].data.reduce(
      (a: number, b: number) => a + b,
      0
    );

    ctx.save();
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${total}`, width / 2, height / 2);
    ctx.restore();
  },
};

const UserRoleDoughnutChart = ({ users }: UserRoleDoughnutChartProps) => {
  const roleCount = users.reduce(
    (acc, user) => {
      acc[user.role]++;
      return acc;
    },
    {
      ADMIN: 0,
      GESTIONNAIRE: 0,
      EMPLOYE: 0,
    }
  );

  const data = {
    labels: ["Admin", "Gestionnaire", "Employé"],
    datasets: [
      {
        data: [roleCount.ADMIN, roleCount.GESTIONNAIRE, roleCount.EMPLOYE],
        backgroundColor: [
          "#ef4444", // rouge
          "#3b82f6", // bleu
          "#22c55e", // vert
        ],
        borderWidth: 2,
        cutout: "70%", // définition de l'épaisseur du doughnut
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Répartition des utilisateurs
      </h2>
      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      <p className="text-center text-sm text-neutral-500 mt-2">
        Total des utilisateurs
      </p>
    </div>
  );
};

export default UserRoleDoughnutChart;
