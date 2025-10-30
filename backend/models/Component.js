import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema(
  {
    header: {
      title: {
        type: String,
        default: 'My Site',
      },
      imageUrl: {
        type: String,
        default: '',
      },
    },
    navbar: [
      {
        label: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    footer: {
      email: {
        type: String,
        default: 'hello@example.com',
      },
      phone: {
        type: String,
        default: '000-000-0000',
      },
      address: {
        type: String,
        default: '123 Example St',
      },
    },
  },
  {
    timestamps: true, 
  }
);

const Component = mongoose.model('Component', ComponentSchema);

export default Component;
