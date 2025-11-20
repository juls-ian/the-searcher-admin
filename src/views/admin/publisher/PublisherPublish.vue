<script setup>
  import MainLayout from '@/layouts/MainLayout.vue'
  import { Form, Field, useForm } from 'vee-validate'
  import { onMounted, ref, watch } from 'vue'
  import { useArticleStore } from '@/stores/article'
  import { useArticleCategoryStore } from '@/stores/articleCategory'
  import { useUserStore } from '@/stores/user'

  import Dropdown from '@/components/forms/Dropdown.vue'
  import Checkbox from '@/components/forms/Checkbox.vue'
  import FileUploader from '@/components/media/FileUploader.vue'
  import RichTextEditor from '@/components/forms/RichTextEditor.vue'
import articleSchema from '@/composables/articleSchema'

  const articleStore = useArticleStore()
  const articleCategoryStore = useArticleCategoryStore()
  const userStore = useUserStore()

  const sameArtist = ref(false)
  // Accessing form methods
  const {setFieldValue} = useForm()


  onMounted(() => {
    articleStore.fetchArticles()
    articleCategoryStore.fetchArticleCategories()
    userStore.fetchUsers()
  })

  // Safety check
  watch(sameArtist, (newValue) => {
    if (newValue === true) {
      // Clearing thumbnail and thumbnail-artist when sameArtist is true
      setFieldValue('thumbnail', null)
      setFieldValue('thumbnail-artist', null)
    }
  })

  const handleSubmit = (values) => {
    console.log('Form values:', values)
  }

  console.log('positions:', userStore.getStaffByPositionCategory)
</script>

<template>
  <MainLayout>
    <div class="workspace">
      <div class="workspace__main-panel">
        <div class="publisher">
          <Form class="publisher__form form" @submit="handleSubmit" :validation-schema="articleSchema">
            <div class="publisher__row form__row">
              <div class="publisher__field-group form__field-group">
                <!-- Title field  -->
                <label class="form__label" for="title">Title</label>
                <Field name="title" v-slot="{ field, errors, errorMessage }">
                  <input
                    type="text"
                    v-bind="field"
                    id="title"
                    placeholder="Add title"
                    class="form__input"
                  />

                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Add to ticker checkbox -->
              <div class="publisher__field-group form__field-group">
                <!-- onChange for regular inputs (dropdown, rte, etc) -->
                <Field
                  name="add-to-ticker"
                  v-slot="{ field, value, errors }"
                  type="checkbox"
                  :value="true"
                  :unchecked-value="false"
                  class="form__checkbox"
                >
                  <Checkbox
                    :model-value="value"
                    @update:model-value="field.onChange"
                    class="form__checkbox"
                    label="Add to ticker"
                  />

                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Article Category dropdown  -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label">Category</label>
                <Field name="category" v-slot="{ field, errors, errorMessage }">
                  <Dropdown
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                    :data="articleCategoryStore.categories"
                    label-name="category_name"
                    value-key="id"
                    parent-key="parent_id"
                    placeholder="Select category"
                    hierarchal
                  />
                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Writer selector  -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label">Writer</label>
                <Field name="writer" v-slot="{ field, errors, errorMessage }">
                  <Dropdown
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                    :data="userStore.getWriters"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select writer"
                  />
                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Date picker -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label">Date</label>

                <Field name="date"> </Field>
              </div>

              <!-- Body textarea -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label" for="tiptapEditor">Body</label>
                <Field name="body" v-slot="{ field, errors, errorMessage }">
                  <RichTextEditor :model-value="field.value" @update:model-value="field.onChange" />

                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Cover -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label">Cover</label>
                <!-- handleChange for file inputs -->
                <Field name="cover" v-slot="{ field, errors, errorMessage, handleChange }">
                  <FileUploader :model-value="field.value" @update:model-value="handleChange" />

                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Cover artist selector  -->
              <div class="publisher__field-group form__field-group">
                <label class="form__label">Cover artist</label>
                <Field name="cover-artist" v-slot="{ field, errors, errorMessage }">
                  <Dropdown
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                    :data="userStore.getArtists"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select cover artist"
                  />
                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Thumbnail -->
              <div v-if="!sameArtist" class="publisher__field-group form__field-group">
                <label class="form__label">Thumbnail</label>
                <Field name="thumbnail" v-slot="{ field, errors, errorMessage, handleChange }">
                  <FileUploader :model-value="field.value" @update:model-value="handleChange" />

                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Thumbnail artist selector  -->
              <div v-if="!sameArtist" class="publisher__field-group form__field-group">
                <label class="form__label">Thumbnail artist</label>
                <Field name="thumbnail-artist" v-slot="{ field, errors, errorMessage }">
                  <Dropdown
                    :model-value="field.value"
                    @update:model-value="field.onChange"
                    @blur="field.onBlur"
                    :data="userStore.getArtists"
                    label-name="full_name"
                    value-key="id"
                    :show-checkbox="true"
                    placeholder="Select thumbnail artist"
                  />
                  <div class="form__input-alert" v-if="errors.length !== 0">
                    {{ errorMessage }}
                  </div>
                </Field>
              </div>

              <!-- Same artist  -->
              <div class="publisher__field-group form__field-group">
                <Field
                  name="same-artist"
                  v-model="sameArtist"
                  type="checkbox"
                  :value="true"
                  :unchecked-value="false"
                  v-slot="{ field }"
                >
                  <Checkbox
                    :model-value="field.value"
                    @update:model-value="
                      (val) => {
                        field.onChange(val)
                        sameArtist = val
                      }
                    "
                    class="form__checkbox"
                    label="Same as cover artist"
                  />
                </Field>
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
