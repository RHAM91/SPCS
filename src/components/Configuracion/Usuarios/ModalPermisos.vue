<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="cerrar" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid>
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <h2>
                            {{i.modulo.toUpperCase()}}
                        </h2>
                    </b-col>
                    <b-col sm="12" class="mt-3">
                        <table class="table table-sm table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>
                                        Permiso
                                    </th>
                                    <th>
                                        ...
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        Ver
                                    </td>
                                    <td>
                                        <select class="form-control form-control-sm" v-model="permiso_ver">
                                            <option value="1">Activo</option>
                                            <option value="0">Denegado</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Crear
                                    </td>
                                    <td>
                                        <select class="form-control form-control-sm" v-model="permiso_crear">
                                            <option value="1">Activo</option>
                                            <option value="0">Denegado</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Leer
                                    </td>
                                    <td>
                                        <select class="form-control form-control-sm" v-model="permiso_leer">
                                            <option value="1">Activo</option>
                                            <option value="0">Denegado</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Actualizar
                                    </td>
                                    <td>
                                        <select class="form-control form-control-sm" v-model="permiso_actualizar">
                                            <option value="1">Activo</option>
                                            <option value="0">Denegado</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Borrar
                                    </td>
                                    <td>
                                        <select class="form-control form-control-sm" v-model="permiso_borrar">
                                            <option value="1">Activo</option>
                                            <option value="0">Denegado</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-col>
                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="button" size="sm" variant="primary" @click="actualizarPermisos">Actualizar</b-button>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'ModalPermisos',
    props:['i'],
    data() {
        return {
            permiso_ver: '',
            permiso_crear: '',
            permiso_leer: '',
            permiso_actualizar: '',
            permiso_borrar: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('salir')
        },
        set_ver(){
            this.permiso_ver = this.i.ver
        },
        set_crear(){
            this.permiso_crear = this.i.crear
        },
        set_leer(){
            this.permiso_leer = this.i.leer
        },
        set_actualizar(){
            this.permiso_actualizar = this.i.actualizar
        },
        set_borrar(){
            this.permiso_borrar = this.i.borrar
        },
        async actualizarPermisos(){
            let f = {
                api: `permisos/?id=${this.i.idUsuario}&modulo=${this.i.modulo}`,
                modo: 'query',
                pull: true,
                formulario: {
                    ver: this.permiso_ver,
                    crear: this.permiso_crear,
                    borrar: this.permiso_borrar,
                    actualizar: this.permiso_actualizar,
                    leer: this.permiso_leer
                }
            }

            await this.updateData(f)
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        this.set_ver()
        this.set_crear()
        this.set_leer()
        this.set_actualizar()
        this.set_borrar()
    },
}
</script>

<style>

</style>