<template>
  <v-hover left>
    <template #default="{hover}">
      <v-btn icon :color="hover ? 'error': ''" @click="removeRow">
        <v-icon>{{ hover ? 'mdi-delete-forever' : 'delete' }}</v-icon>
        <confirmation-dialog
          v-model="isDeleteDialogOpened"
          @confirm="confirm"
          @decline="isDeleteDialogOpened = false"
        />
      </v-btn>
    </template>
  </v-hover>
</template>
<script>
import ConfirmationDialog from '../../shared/components/ConfirmationDialog'
export default {
  components: {
    ConfirmationDialog
  },
  data () {
    return {
      isDeleteDialogOpened: false
    }
  },
  methods: {
    removeRow (row) {
      this.isDeleteDialogOpened = true
    },
    confirm () {
      this.$emit('delete')
      this.isDeleteDialogOpened = false
    }
  }
}
</script>
