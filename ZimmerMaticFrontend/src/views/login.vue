<template>
    <main class="px-3 pt-5">
        <div class="container-fluid pt-5">
            <div class="row justify-content-center mt-5">
                <div class="col-lg-4">
                    <div class="image_space">
                        <img src="../assets/zMatic.svg" alt="Logo" class="mb-2">
                    </div>
                    <div class="card mt-5">
                        <div class="card-header">
                            Login
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label for="email" class="form-label">Benutzername</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                                    <input type="email" class="form-control" id="email" placeholder=""
                                        v-model="email">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="pass" class="form-label">Passwort</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="bi bi-key"></i></span>
                                    <input type="password" class="form-control" id="pass" v-model="pass">
                                </div>
                            </div>
                            <a href="#" class="btn btn-outline-primary float-end" @click="sign_in()">Einloggen</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        sign_in() {
            console.log(this.username, this.password);
            this.$router.push("/")
        }
    },
    mounted() {
    },
};
</script>

<style scoped>
.image_space {
    object-fit: contain;
    margin-top: -10%;
    margin-bottom: -10%;
}
</style>