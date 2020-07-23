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
        computed: {
            gradient() {
                let grad = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
                grad.addColorStop(0, '#cccccc');
                grad.addColorStop(1, '#000000');
                //grad.addColorStop(0, 'rgb(216,77,110)');
                //grad.addColorStop(1, 'rgb(38,209,152)');
                return grad
            }
        },
        methods: {
            render() {
                this.renderChart({
                    datasets: [
                        {
                            borderWidth: 1,
                            borderColor: 'rgb(0, 0, 0)',
                            //backgroundColor: 'rgba(187, 222, 251, 1)',
                            //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backgroundColor: this.gradient,
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