<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="salir" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="actualizar">
                    <b-row>
                        <b-col sm="10" class="mt-3">
                            <label for="">Nombre estado</label>
                            <b-form-input type="text" id="campoestado" v-model="campoestado" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="2" class="mt-3">
                            <b-button type="submit" size="sm" variant="primary" block style="margin-top: 31px;">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ActualizarEstadoCivil',
    props: ['itemEstado'],
    data() {
        return {
            campoestado: this.itemEstado.estado
        }
    },
    methods: {
        salir(){
            this.$emit('salir')
        },
        async actualizar(){
            let data = {
                api: 'estadocivil',
                id: this.itemEstado.id,
                modo: 'param',
                pull: true,
                formulario: {
                    estado: this.campoestado.toUpperCase()
                }
            }

            await this.updateData(data)
            await this.salir()
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        document.getElementById('campoestado').focus()
    },
}
</script>

<style>

</style>