<script setup></script>

<template>
  <Transition name="fade">
    <div class="spinner-overlay">
      <div class="spinner-overlay__container">
        <div class="self-building-square-spinner">
          <div class="square"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square clear"></div>
          <div class="square"></div>
          <div class="square"></div>
          <div class="square clear"></div>
          <div class="square"></div>
          <div class="square"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &__overlay-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.self-building-square-spinner,
.self-building-square-spinner * {
  box-sizing: border-box;
}

.self-building-square-spinner {
  height: 40px;
  width: 40px;
  top: calc(-10px * 2 / 3);
}

.self-building-square-spinner .square {
  height: 10px;
  width: 10px;
  top: calc(-10px * 2 / 3);
  margin-right: calc(10px / 3);
  margin-top: calc(10px / 3);
  background: #ff1d5e;
  float: left;
  position: relative;
  opacity: 0;
  animation: self-building-square-spinner 6s infinite;
}

.self-building-square-spinner .square:nth-child(1) {
  animation-delay: calc(300ms * 6);
}

.self-building-square-spinner .square:nth-child(2) {
  animation-delay: calc(300ms * 7);
}

.self-building-square-spinner .square:nth-child(3) {
  animation-delay: calc(300ms * 8);
}

.self-building-square-spinner .square:nth-child(4) {
  animation-delay: calc(300ms * 3);
}

.self-building-square-spinner .square:nth-child(5) {
  animation-delay: calc(300ms * 4);
}

.self-building-square-spinner .square:nth-child(6) {
  animation-delay: calc(300ms * 5);
}

.self-building-square-spinner .square:nth-child(7) {
  animation-delay: calc(300ms * 0);
}

.self-building-square-spinner .square:nth-child(8) {
  animation-delay: calc(300ms * 1);
}

.self-building-square-spinner .square:nth-child(9) {
  animation-delay: calc(300ms * 2);
}

.self-building-square-spinner .clear {
  clear: both;
}

@keyframes self-building-square-spinner {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    top: 0;
  }
  50.9% {
    opacity: 1;
    top: 0;
  }
  55.9% {
    opacity: 0;
    top: inherit;
  }
}
</style>
