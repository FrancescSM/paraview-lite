import {
  generateComponentWithServerBinding,
  bool2int,
  toBoolean,
} from 'paraview-lite/src/proxyHelper';

import module from './module';

export default generateComponentWithServerBinding(
  'Slice',
  'Source',
  {
    crinkleslice: {
      name: 'PreserveInputCells',
      label: 'Crinkleslice',
      clientToServer: bool2int,
      serverToClient: toBoolean,
      autoApply: false,
      default: 0,
    },
    origin: {
      name: 'Origin',
      autoApply: false,
      default: [0, 0, 0],
      subProxy: 'SliceType',
    },
    normal: {
      name: 'Normal',
      autoApply: false,
      default: [0, 0, 1],
      subProxy: 'SliceType',
    },
    offsets: {
      name: 'ContourValues',
      label: 'SliceOffsetValues',
      autoApply: false,
      default: [0],
    },
  },
  {
    name: 'Slice',
    data() {
      return {
        module,
        color: 'grey darken-2',
        normalMode: 3,
      };
    },
    mounted() {
      if (this.create) {
        // Use input bounds to set initial values
        const bounds = this.inputBounds;
        this.origin = [
          0.5 * (bounds[0] + bounds[1]),
          0.5 * (bounds[2] + bounds[3]),
          0.5 * (bounds[4] + bounds[5]),
        ];
      }
    },
    computed: {
      offset: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.offsets[0];
        },
        set(value) {
          this.mtime++;
          this.offsets = [Number(value)];
          this.$forceUpdate();
        },
      },
      offsetDelta() {
        const bounds = this.inputBounds;
        return Math.sqrt(
          (bounds[1] - bounds[0]) * (bounds[1] - bounds[0]) +
            (bounds[3] - bounds[2]) * (bounds[3] - bounds[2]) +
            (bounds[5] - bounds[4]) * (bounds[5] - bounds[4])
        );
      },
      xNormal: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.normal[0];
        },
        set(value) {
          this.mtime++;
          const newNormal = this.normal.slice();
          newNormal[0] = value;
          this.normal = newNormal.map(Number);
          this.$forceUpdate();
        },
      },
      yNormal: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.normal[1];
        },
        set(value) {
          this.mtime++;
          const newNormal = this.normal.slice();
          newNormal[1] = value;
          this.normal = newNormal.map(Number);
          this.$forceUpdate();
        },
      },
      zNormal: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.normal[2];
        },
        set(value) {
          this.mtime++;
          const newNormal = this.normal.slice();
          newNormal[2] = value;
          this.normal = newNormal.map(Number);
          this.$forceUpdate();
        },
      },
      xOrigin: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.origin[0];
        },
        set(value) {
          this.mtime++;
          const newOrigin = this.origin.slice();
          newOrigin[0] = value;
          this.origin = newOrigin.map(Number);
          this.$forceUpdate();
        },
      },
      yOrigin: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.origin[1];
        },
        set(value) {
          this.mtime++;
          const newOrigin = this.origin.slice();
          newOrigin[1] = value;
          this.origin = newOrigin.map(Number);
          this.$forceUpdate();
        },
      },
      zOrigin: {
        get() {
          // register dependency
          this.mtime; // eslint-disable-line
          return this.origin[2];
        },
        set(value) {
          this.mtime++;
          const newOrigin = this.origin.slice();
          newOrigin[2] = value;
          this.origin = newOrigin;
          this.$forceUpdate();
        },
      },
    },
    watch: {
      normalMode() {
        // register dependency
        this.mtime; // eslint-disable-line
        const newNormal = [0, 0, 0];
        newNormal[this.normalMode] = 1;
        if (this.normalMode < 3) {
          this.normal = newNormal.map(Number);
          this.$forceUpdate();
        }
      },
    },
  }
);
