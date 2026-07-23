import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rminhal783_db_user:pi8fODTUIsdDiKF5@cluster0.ijtzyjr.mongodb.net/?appName=Cluster0';

let isConnected = false;
let lastConnectionAttempt = 0;
const RETRY_COOLING_PERIOD_MS = 20000; // 20 seconds cooling period

export async function connectDB() {
  if (isConnected) return;

  const now = Date.now();
  if (now - lastConnectionAttempt < RETRY_COOLING_PERIOD_MS) {
    console.warn(`⚠️ MongoDB connection in cooling period. Skipping connect attempt to prevent blocking.`);
    throw new Error('Database connection is temporarily unavailable');
  }

  try {
    lastConnectionAttempt = now;
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2000,  // fail fast — 2s instead of 5s
      connectTimeoutMS: 2000,
      socketTimeoutMS: 5000,
    });
    isConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// ── Property Schema ──
const propertySchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  name: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  zipCode: String,
  buildings: { type: Number, default: 1 },
  units: { type: Number, default: 1 },
  status: { type: String, default: 'active' },
  userId: { type: String, default: null },  // stored as string to match JWT payload
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

// ── User Schema ──
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  role: { type: String, default: 'inspector' },
  isEmailVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// ── Inspection Schema ──
const inspectionSchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inspectionType: String,
  unitId: String,
  buildingId: String,
  status: { type: String, default: 'in-progress' },
  data: mongoose.Schema.Types.Mixed,
  completedAt: Date,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Inspection = mongoose.models.Inspection || mongoose.model('Inspection', inspectionSchema);
