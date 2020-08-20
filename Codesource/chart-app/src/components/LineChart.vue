<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  data () {
    return {
      datacollection: {
        labels: ['January', 'February', 'March', 'April', 'May',
          'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
        datasets: [
          {
            label: 'Data one',
            backgroundColor: '#f87979',
            pointBackgroundColor: 'white',
            borderWidth: 10,
            pointBorderColor: '#249EBF',
            data: [60, 40, 20, 50, 90, 10, 20, 40, 50, 70, 90, 100]
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
