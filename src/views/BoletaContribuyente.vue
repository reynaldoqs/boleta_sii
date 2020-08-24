<template>
<v-container>
    <v-form ref="form">
        <v-card class="pa-2" outlined>
            <v-row>
                <v-col cols="12" md="5">
                    <template v-if="!isLoading">
                        <v-switch v-model="formData.receptorActuaReteniendo" :label="formData.receptorActuaReteniendo?'El receptor de la boleta actuará reteniendo el porcentaje vigente de Pago Provisional Mensual':'El contribuyente emisor será quien se encargue de la retención del porcentaje vigente de Pago Provisional Mensual'" class="mx-4"></v-switch>

                        <v-text-field v-model="formData.rutReceptor" label="Rut Destinatario" required></v-text-field>

                        <v-text-field v-model="formData.razonReceptor" label="Nombres Destinatario" required></v-text-field>

                        <v-text-field v-model="formData.domicilioReceptor" label="Domicilio Destinatario" required></v-text-field>

                        <v-select v-model="formData.region" :items="regiones" item-text="label" item-value="value" label="Región"></v-select>

                        <v-select v-model="formData.comuna" :items="comunas" item-text="label" item-value="value" label="Comuna"></v-select>

                        <v-row>
                            <v-col cols="8">
                                <v-text-field v-model="formData.prestaciones[0].prestacion" label="Prestación 1" required></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="formData.prestaciones[0].valor" label="Valor 1" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn @click="generar">Generar boleta</v-btn>
                    </template>
                    <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
                </v-col>

                <v-col cols="12" md="7">
                    <v-row>
                        <v-col cols="12">{{response}}</v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <img class="boleta-img" v-if="response" :src="`https://unabasesii.herokuapp.com/images/${response.imgUrl}`" alt />
                        </v-col>
                        <v-row>
                            <v-btn v-if="response" @click="linkPdf">ver pdf</v-btn>
                        </v-row>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-form>
</v-container>
</template>

<script>
import {
    genBoleta
} from "../services/sii";
import {
    REGIONES
} from "../utils/regiones";

export default {
    name: "boleta",
    data: () => ({
        isLoading: false,
        formData: {
            fechaBoleta: null,
            receptorActuaReteniendo: true,
            rutReceptor: "76665990-k",
            razonReceptor: null,
            domicilioReceptor: null,
            region: null,
            comuna: null,
            prestaciones: [{
                prestacion: null,
                valor: null,
            }, ],
        },
        response: null,
    }),
    computed: {
        regiones() {
            return REGIONES;
        },
        comunas() {
            if (!this.formData.region) return [];

            return this.regiones.find((r) => r.value === this.formData.region)
                .comunas;
        },
    },
    methods: {
        linkPdf() {
            window.open(
                `https://unabasesii.herokuapp.com/images/${this.response.pdfUrl}`,
                "_blank"
            );
        },
        async generar() {
            try {
                this.response = null;
                this.isLoading = true;
                const {
                    data
                } = await genBoleta(this.formData);
                console.log(data);
                this.response = data;
                this.isLoading = false;
            } catch (error) {
                console.error(error);
                this.isLoading = false;
            }
        },
    },
};
</script>

<style scoped>
.boleta-img {
    object-fit: cover;
    max-width: 100%;
}
</style>
