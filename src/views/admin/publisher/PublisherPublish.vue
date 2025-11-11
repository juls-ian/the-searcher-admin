<script setup>
import MainLayout from '@/layouts/MainLayout.vue'
import { Form, Field } from 'vee-validate'
import { useArticleStore } from '@/stores/article'
import { useArticleCategoryStore } from '@/stores/articleCategory'
import { useUserStore } from '@/stores/user'

import Dropdown from '@/components/forms/Dropdown.vue'
import { onMounted, ref } from 'vue'
import Checkbox from '@/components/forms/Checkbox.vue'
import FileUploader from '@/components/media/FileUploader.vue'
import MultiFileUploader from '@/components/media/MultiFileUploader.vue'

const articleStore = useArticleStore()
const articleCategoryStore = useArticleCategoryStore()
const userStore = useUserStore()

const selectedCategory = ref(null) // the ids of currently selected
const addToTicker = ref(false)
const sameArtist = ref(false)
const selectedWriter = ref(null)
const selectedCoverArtist = ref(null)
const selectedThumbnailArtist = ref(null)

onMounted(() => {
  articleStore.fetchArticles()
  articleCategoryStore.fetchArticleCategories()
  userStore.fetchUsers()
})

console.log('positions:', userStore.getStaffByPositionCategory)
</script>

<template>
  <MainLayout>
    <div class="workspace">
      <div class="workspace__main-panel">
        <div class="publisher">
          <Form class="publisher__form form">
            <div class="publisher__row form__row">
              <div class="publisher__field-group form__field-group">
                <!-- Title field  -->

                <label class="form__label" for="title">Title</label>
                <Field name="title">
                  <input type="text" id="title" placeholder="Add title" class="form__input" />
                </Field>
              </div>

              <!-- Add to ticker checkbox -->
              <div class="publisher__field-group form__field-group">
                <Field
                  name="add-to-ticker"
                  v-model="addToTicker"
                  type="checkbox"
                  :value="true"
                  :unchecked-value="false"
                  class="form__checkbox"
                >
                  <!-- <label class="form__label"> -->
                  <!-- <input type="checkbox" :value="true" class="form__checkbox" /> -->
                  <Checkbox v-model="addToTicker" class="form__checkbox" label="Add to ticker" />
                  <!-- </label> -->
                </Field>
              </div>

              <!-- Article Category dropdown  -->
              <div class="publisher__field-group form__field-group">
                <Field name="category">
                  <Dropdown
                    v-model="selectedCategory"
                    :data="articleCategoryStore.categories"
                    label-name="category_name"
                    value-key="id"
                    parent-key="parent_id"
                    placeholder="Select category"
                    hierarchal
                  />
                </Field>
              </div>

              <!-- Writer selector  -->
              <div class="publisher__field-group form__field-group">
                <Field name="writer">
                  <Dropdown
                    v-model="selectedWriter"
                    :data="userStore.getWriters"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select writer"
                  />
                </Field>
              </div>

              <!-- Date picker -->
              <div class="publisher__field-group form__field-group">
                <Field name="date"> </Field>
              </div>

              <!-- Body textarea -->
              <div class="publisher__field-group form__field-group">
                <Field name="body"> </Field>
              </div>

              <!-- Cover -->
              <div class="publisher__field-group form__field-group">
                <Field name="cover">
                  <FileUploader />
                </Field>
              </div>

              <!-- Cover artist selector  -->
              <div class="publisher__field-group form__field-group">
                <Field name="writer">
                  <Dropdown
                    v-model="selectedWriter"
                    :data="userStore.getArtists"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select cover artist"
                  />
                </Field>
              </div>

              <!-- Thumbnail -->
              <div v-if="!sameArtist" class="publisher__field-group form__field-group">
                <Field name="cover">
                  <FileUploader />
                </Field>
              </div>

              <!-- Thumbnail artist selector  -->
              <div v-if="!sameArtist" class="publisher__field-group form__field-group">
                <Field name="writer">
                  <Dropdown
                    v-model="selectedWriter"
                    :data="userStore.getArtists"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select thumbnail artist"
                  />
                </Field>
              </div>

              <!-- Same artist  -->
              <div class="publisher__field-group form__field-group">
                <Checkbox
                  v-model="sameArtist"
                  class="form__checkbox"
                  label="Same as cover artist"
                />
              </div>

              <div class="publisher__btn-group form__btn-group">
                <button type="submit" class="publisher__btn btn btn--preview">
                  <span> Preview </span>
                </button>

                <button type="submit" class="publisher__btn btn btn--primary">
                  <span> Publish </span>
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div class="workspace__sub-panel"></div>
    </div>
  </MainLayout>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;
@use '@/assets/layouts' as *;

.publisher {
  &__btn-group {
    margin-top: spacing(3);
  }
}
</style>
