<template>
    <div class="back">
        <div class="front">
                <h2>Сводая панель</h2>
                <p>Всего устройств в базе: {{devLength}}</p>
                <p>Всего отпечатков с начала месяца: {{allPrintouts}}</p>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapMutations} from "vuex";

    export default {
        name: "Dashboard",
        computed: {
            ...mapGetters(['allTemplates', 'getBlur', 'allPrintouts', 'devLength']),
        },
        methods: {
            ...mapMutations(['toggleBlur']),
            ...mapActions(['fetchTemplates'])
        },
    }
</script>

<style scoped>
    .back {
        width: 600px;
        height: 450px;
        background-color: rgb(49,51,53);
        color: white;
        position: fixed;
        left: 50px;
        top: 190px;
        z-index: 100;
        filter: none;
        border-radius: 10px;
        box-shadow: 0 15px 30px rgba(0,0,0,0.7);
    }
    .back .front {
        width: 580px;
        height: 430px;
        position: fixed;
        top: 6px;
        left: 6px;
        background-color: rgb(49,51,53);
        color: white;
        position: relative;
        margin: 0;
        z-index: 100;
        filter: none;
        border-radius: 10px;
        border: 4px solid #cccccc;
    }
    .back .front p {
        margin: 2px;
        padding: 0;
    }
    #submit {
        background-color: rgb(50,251,107);
        color: #2c3e50;
    }
    #clear {
        background-color: rgb(239,176,44);
        color: white;
    }
    #close {
        background-color: rgb(187,29,21);
        color: white;
    }
    .back .front a {
        position: relative;
        padding: 10px 20px;
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        background-color: rgb(242,242,242);
        color: black;
        border-radius: 5px;
        font-size: 0.7rem;
    }
</style>