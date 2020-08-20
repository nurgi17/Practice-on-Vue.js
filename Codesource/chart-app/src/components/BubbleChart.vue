<script>
import { Bubble } from 'vue-chartjs'
export default {
  extends: Bubble,
  data () {
    return {
      datacollection: {
        labels: ['Data'],
        datasets: [
          {
            label: 'Data one',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 10,
            pointBorderColor: '#249EBF',
            data: [
              {
                x: 100,
                y: 50,
                r: 30
              },
              {
                x: 60,
                y: 30,
                r: 20
              },
              {
                x: 40,
                y: 60,
                r: 25
              },
              {
                x: 80,
                y: 80,
                r: 50
              },
              {
                x: 20,
                y: 30,
                r: 25
              },
              {
                x: 120,
                y: 100,
                r: 5
              }
            ]
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: false,
        maintainAspectRation: false
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  }
}
</script>
