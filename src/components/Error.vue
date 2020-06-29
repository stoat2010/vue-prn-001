<template>
    <div class="errbody">
        <div class="error">
            <h2>Ошибка подключения к серверу</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Error"
    }
</script>

<style scoped>
    .errbody {
        width: 100%;
        min-height: 100vh;
        background-color: #eeeeee;
        display: flex;
        justify-content: center;
    }
    .error {
        width: 80%;
        height: 100px;
        font-weight: 400;
        font-size: 2.1rem;
        background-color: #d81b60;
        color: #fff;
        margin-left: 20px;
        margin-right: 20px;
        top:50%;
        left: 50%;
    }
</style>