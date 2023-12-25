<template>
    <div class="modal fade" tabindex="-1" id="cronInfoModal" aria-labelledby="CronModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Cronjob <i>{{ this.cronjob.jobName }}</i>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="CronModalLabel"></button>
                </div>
                <div class="modal-body">
                    <p>Typ: {{ this.cronjob.type }}</p>
                    <p>Expression: {{ this.cronjob.expression }}</p>
                    <p>Aktiv: {{ this.cronjob.active }}</p>
                    <p>Einmalig: {{ this.cronjob.oneTimeJob }}</p>
                    <div v-if="this.cronjob.type == 'LED'">
                        <p>Farbe: RGB({{ this.cronjob.color.r }}, {{ this.cronjob.color.g }}, {{ this.cronjob.color.b }})</p>
                        <p class="mb-0">LEDs:</p>
                        <li class="ms-3" v-for="item in this.cronjob.whichLED">{{ item }}</li>
                    </div>
                    <div v-if="this.cronjob.type == 'Rolladen'">
                        <p>Rolladen: {{ this.cronjob.whichShutter }}</p>
                        <p>Richtung: {{ this.cronjob.direction }}</p>
                    </div>
                    <div v-if="this.cronjob.type == 'Licht'">
                        <p>Helligkeit: {{ this.cronjob.brightness }}</p>
                        <p>Farbtemperatur: {{ this.cronjob.color }}</p>
                        <p class="mb-0">Lichter:</p>
                        <li class="ms-3" v-for="item in this.cronjob.whichLight">{{ item }}</li>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Schließen</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["cronjob"],
    components: {},
    data() {
        return {};
    },
};
</script>