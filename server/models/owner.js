import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Technology = new Schema({ name: String });

const ownerSchema = new Schema({
  name: { type: 'String', required: true },
  jobPosition: { type: 'String', required: true },
  technologies: [Technology],
  availability: Schema.Types.Decimal128,
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Owner', ownerSchema);
