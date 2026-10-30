import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDoc, 
  setDoc, 
  doc, 
  updateDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration (provided by user)
const firebaseConfig = {
  apiKey: "AIzaSyBXMJPm4FgXae56rdQoztqIG5GlwBafLZM",
  authDomain: "ld-fabrine-fernandes.firebaseapp.com",
  projectId: "ld-fabrine-fernandes",
  storageBucket: "ld-fabrine-fernandes.firebasestorage.app",
  messagingSenderId: "102219475858",
  appId: "1:102219475858:web:acf5cb71dd7ecbec2def4b",
  measurementId: "G-NV2FNGGJ03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// TRACKING CLICK EVENTS
export async function trackClick(label: string, type: "whatsapp" | "book" | "course" | "general" = "whatsapp") {
  try {
    await addDoc(collection(db, "clicks"), {
      label,
      type,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error tracking click:", error);
  }
}

// SAVING FORM SUBMISSIONS / LEADS
export async function saveLead(leadData: {
  parentName: string;
  childName: string;
  childAge: string | number;
  phone: string;
  challenge: string;
  mode: string;
}) {
  try {
    const leadRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      timestamp: new Date().toISOString(),
      status: "Novo" // Statuses: "Novo", "Em Atendimento", "Fidelizado", "Arquivado"
    });
    return leadRef.id;
  } catch (error) {
    console.error("Error saving lead:", error);
    throw error;
  }
}

// RETRIEVING CONFIGS (E.G. ADMIN PASSWORD)
export async function getAdminPassword(): Promise<string> {
  try {
    const configDocRef = doc(db, "config", "admin");
    const configDoc = await getDoc(configDocRef);
    if (configDoc.exists()) {
      return configDoc.data().password || "1306";
    } else {
      // Create initial configuration document if it doesn't exist
      await setDoc(configDocRef, { password: "1306" });
      return "1306";
    }
  } catch (error) {
    console.error("Error getting password, defaulting to 1306:", error);
    return "1306";
  }
}

export async function updateAdminPassword(newPassword: string): Promise<boolean> {
  try {
    const configDocRef = doc(db, "config", "admin");
    await setDoc(configDocRef, { password: newPassword }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    return false;
  }
}

// RETRIEVING LEADS FOR ADMIN
export async function getLeads() {
  try {
    const leadsSnap = await getDocs(query(collection(db, "leads"), orderBy("timestamp", "desc")));
    return leadsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Error getting leads:", error);
    return [];
  }
}

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const leadRef = doc(db, "leads", leadId);
    await updateDoc(leadRef, { status });
    return true;
  } catch (error) {
    console.error("Error updating lead status:", error);
    return false;
  }
}

export async function deleteLead(leadId: string) {
  try {
    await deleteDoc(doc(db, "leads", leadId));
    return true;
  } catch (error) {
    console.error("Error deleting lead:", error);
    return false;
  }
}

// RETRIEVING CLICKS FOR ADMIN
export async function getClicks() {
  try {
    const clicksSnap = await getDocs(query(collection(db, "clicks"), orderBy("timestamp", "desc")));
    return clicksSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];
  } catch (error) {
    console.error("Error getting clicks:", error);
    return [];
  }
}

// FINANCIAL CRM TRANSACTIONS
export interface FinancialTransaction {
  id?: string;
  patientName: string;
  serviceName: string;
  totalValue: number;
  person1Name: string; // e.g., Dra. Fabrine
  person1Percent: number; // e.g., 50%
  person1Value: number; // calculated value
  person2Name: string;
  person2Percent: number;
  person2Value: number;
  person3Name: string;
  person3Percent: number;
  person3Value: number;
  timestamp: string;
  observations?: string;
}

export async function addTransaction(transaction: FinancialTransaction) {
  try {
    const transRef = await addDoc(collection(db, "transactions"), {
      ...transaction,
      timestamp: new Date().toISOString()
    });
    return transRef.id;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
}

export async function getTransactions() {
  try {
    const transSnap = await getDocs(query(collection(db, "transactions"), orderBy("timestamp", "desc")));
    return transSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FinancialTransaction[];
  } catch (error) {
    console.error("Error getting transactions:", error);
    return [];
  }
}

export async function deleteTransaction(transId: string) {
  try {
    await deleteDoc(doc(db, "transactions", transId));
    return true;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return false;
  }
}
