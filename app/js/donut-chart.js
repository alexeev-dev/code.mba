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
        data: [23, 42, 17, 28],
        backgroundColor: [
            "#4cc2c0",
            "#3cb878",
            "#fcb03b",
            "#f15b26"
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
