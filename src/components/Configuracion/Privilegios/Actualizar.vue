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
                            <label for="">Nombre del privilegio</label>
                            <b-form-input type="text" id="campoprivilegio" v-model="campoprivilegio" autocomplete="off" required size="sm"></b-form-input>
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
    name: 'ActualizarPrivilegios',
    props: ['itemPrivilegio'],
    data() {
        return {
            campoprivilegio: this.itemPrivilegio.privilegio
        }
    },
    methods: {
        salir(){
            this.$emit('salir')
        },
        async actualizar(){
            let data = {
                api: 'privilegios',
                id: this.itemPrivilegio.id,
                pull: false,
                formulario: {
                    privilegio: this.campoprivilegio.toUpperCase()
                }
            }

            await this.updateData(data)
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        document.getElementById('campoprivilegio').focus()
    },
}
</script>

<style>

</style>