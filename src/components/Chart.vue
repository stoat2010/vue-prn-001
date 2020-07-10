<script>
    import { Bar } from 'vue-chartjs'
    export default ({
        extends: Bar,
        props: ['values'],
        name: "Chart",
        watch: {
            values: {
                handler(){
                    this.render();
                },
                deep : true
            },
        },
        methods: {
            render() {
                this.renderChart({
                    datasets: [
                        {
                            borderColor: 'rgb(0, 0, 0)',
                            //backgroundColor: 'rgba(187, 222, 251, 1)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            //data: [1103, 987, 1054, 1098, 874,654]
                            data: this.values,
                        }
                    ],
                    labels: [1,2,3,4,5,6,7,8,9,10,11,12]
                },{
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {display: false},
                    scales: {
                        xAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                            }
                        }],
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true,
                            }
                        }],
                    },
                })
            }
        },
        mounted() {
            this.render()
        }
    })

</script>

<style scoped>

</style>