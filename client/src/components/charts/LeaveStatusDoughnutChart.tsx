/**
 * Composant: Diagramme affichant le nombre de demande de congés et leurs statuts
 */
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type Plugin,
  type ChartOptions,
} from "chart.js";
import type { LeaveRequestType } from "../../@types/requestLeave";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin: Plugin<"doughnut"> = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, width, height } = chart;
    const total = chart.data.datasets[0].data.reduce(
      (a: number, b: number) => a + b,
      0,
    );

    ctx.save();
    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${total}`, width / 2, height / 2);
    ctx.restore();
  },
};

type Props = {
  leaves: LeaveRequestType[];
};

const LeaveStatusDoughnutChart = ({ leaves }: Props) => {
  const stats = leaves.reduce(
    (acc, l) => {
      acc[l.statut]++;
      return acc;
    },
    {
      EN_ATTENTE: 0,
      ACCEPTEE: 0,
      REFUSEE: 0,
    },
  );

  const data = {
    labels: ["En attente", "Acceptées", "Refusées"],
    datasets: [
      {
        data: [stats.EN_ATTENTE, stats.ACCEPTEE, stats.REFUSEE],
        backgroundColor: [
          "#facc15", // jaune
          "#22c55e", // vert
          "#ef4444", // rouge
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
        Statut des demandes de congé
      </h2>

      <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />

      <p className="text-center text-sm text-neutral-500 mt-2">
        Total des demandes
      </p>
    </div>
  );
};

export default LeaveStatusDoughnutChart;
