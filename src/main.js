
import Chart from "chart.js/auto";
import "./style.css";

const ctx = document.getElementById("myChart");

// Crear el gráfico
const chart = new Chart(ctx, {
  type: "bar",

  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],

    datasets: [
      {
        label: "Número de votos",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#20c878",
        borderWidth: 0,
      },
    ],
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Obtener el botón
const updateButton = document.getElementById("updateChart");

// Actualizar el gráfico al pulsar el botón
updateButton.addEventListener("click", () => {
  const title = document.getElementById("chartTitle").value.trim();

  const labels = document
    .getElementById("chartLabels")
    .value.split(",")
    .map((label) => label.trim());

  const values = document
    .getElementById("chartValues")
    .value.split(",")
    .map((value) => Number(value.trim()));

  const selectedColor = document.querySelector(
    'input[name="barColor"]:checked'
  );

  // Comprobar que los datos sean válidos
  if (
    !title ||
    labels.some((label) => label === "") ||
    labels.length !== values.length ||
    values.some((value) => !Number.isFinite(value) || value < 0)
  ) {
    alert("Revisa el nombre, las etiquetas y los valores.");
    return;
  }

  // Obtener el color seleccionado
  const color = selectedColor.value;

  // Modificar los datos del gráfico
  chart.data.labels = labels;
  chart.data.datasets[0].label = title;
  chart.data.datasets[0].data = values;
  chart.data.datasets[0].backgroundColor = color;

  // Actualizar el título visible
  document.getElementById("chartTitleDisplay").textContent = title;

  // Dibujar el gráfico de nuevo
  chart.update();
});
