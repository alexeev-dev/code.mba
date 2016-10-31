let DonutChart = {
  data: {
    labels: [
      "Аналитика в профессии",
      "Техническая сторона",
      "Креативность и творчество",
      "Повторяющиеся действия"
    ],
    datasets: [
      {
        data: [40, 31, 20, 9],
        backgroundColor: [
            "#4cc2c0",
            "#f15b26",
            "#fcb03b",
            "#3cb878"
        ]
      }
    ]
  },

  context: $("#myChart")[0],

  init() {
    let data = this.data;

    let [wp] = $("#myChart").waypoint((direction) => {
      let chart = new Chart(this.context, {
        type: "doughnut",
        data,
        options: {
          legend: { display: false }
        },
        animation: {
          animateScale: true
        }
      });
      wp.destroy();
    }, { offset: "75%" });

  }
}

export {DonutChart};
