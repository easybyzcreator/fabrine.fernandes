import React, { useState, useEffect } from "react";
import { 
  Lock, 
  Unlock, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Check, 
  Trash2, 
  LogOut, 
  RefreshCw, 
  Plus, 
  Settings, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Calendar, 
  ChevronRight, 
  Phone, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  QrCode
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  getAdminPassword, 
  updateAdminPassword, 
  getLeads, 
  updateLeadStatus, 
  deleteLead, 
  getClicks, 
  addTransaction, 
  getTransactions, 
  deleteTransaction,
  FinancialTransaction
} from "../lib/firebase";

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("admin_authenticated") === "true";
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Tabs: 'overview' | 'leads' | 'transactions' | 'clicks' | 'settings'
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [leads, setLeads] = useState<any[]>([]);
  const [clicks, setClicks] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  
  // Settings & Commission States
  const [adminPasswordConfig, setAdminPasswordConfig] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Transaction form state
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  
  const [transForm, setTransForm] = useState({
    patientName: "",
    serviceName: "",
    totalValue: "",
    person1Name: "Fabrine (Profissional)",
    person1Percent: "50",
    person2Name: "Parceiro / Indicação",
    person2Percent: "25",
    person3Name: "Clínica / Custos",
    person3Percent: "25",
    observations: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const correctPassword = await getAdminPassword();
      if (password === correctPassword) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        fetchData();
      } else {
        setError("Senha incorreta. Tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const fetchedLeads = await getLeads();
      const fetchedClicks = await getClicks();
      const fetchedTransactions = await getTransactions();
      
      setLeads(fetchedLeads);
      setClicks(fetchedClicks);
      setTransactions(fetchedTransactions);
    } catch (err) {
      console.error("Erro ao carregar dados do Firebase:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const success = await updateLeadStatus(leadId, newStatus);
    if (success) {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (confirm("Tem certeza que deseja excluir esta triagem?")) {
      const success = await deleteLead(leadId);
      if (success) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
      }
    }
  };

  const handleDeleteTransaction = async (transId: string) => {
    if (confirm("Tem certeza que deseja excluir este lançamento financeiro?")) {
      const success = await deleteTransaction(transId);
      if (success) {
        setTransactions(prev => prev.filter(t => t.id !== transId));
      }
    }
  };

  const handleOpenTransactionFromLead = (lead: any) => {
    setSelectedLead(lead);
    setTransForm({
      patientName: lead.childName ? `${lead.childName} (Responsável: ${lead.parentName})` : lead.parentName,
      serviceName: lead.challenge ? `Atendimento pós-triagem` : "Sessão Clínica",
      totalValue: "",
      person1Name: "Fabrine (Profissional)",
      person1Percent: "50",
      person2Name: "Parceiro / Indicação",
      person2Percent: "25",
      person3Name: "Clínica / Custos",
      person3Percent: "25",
      observations: `Originado da triagem do dia ${new Date(lead.timestamp).toLocaleDateString("pt-BR")}. Contato: ${lead.phone}`
    });
    setShowTransactionModal(true);
  };

  const handleOpenNewTransaction = () => {
    setSelectedLead(null);
    setTransForm({
      patientName: "",
      serviceName: "",
      totalValue: "",
      person1Name: "Fabrine (Profissional)",
      person1Percent: "50",
      person2Name: "Parceiro / Indicação",
      person2Percent: "25",
      person3Name: "Clínica / Custos",
      person3Percent: "25",
      observations: ""
    });
    setShowTransactionModal(true);
  };

  const handleSaveTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const valTotal = parseFloat(transForm.totalValue);
    const p1Percent = parseFloat(transForm.person1Percent) || 0;
    const p2Percent = parseFloat(transForm.person2Percent) || 0;
    const p3Percent = parseFloat(transForm.person3Percent) || 0;

    if (isNaN(valTotal) || valTotal <= 0) {
      alert("Por favor, insira um valor total válido.");
      return;
    }

    if (p1Percent + p2Percent + p3Percent !== 100) {
      if (!confirm(`A soma das comissões (${p1Percent + p2Percent + p3Percent}%) é diferente de 100%. Deseja salvar assim mesmo?`)) {
        return;
      }
    }

    const t: FinancialTransaction = {
      patientName: transForm.patientName,
      serviceName: transForm.serviceName,
      totalValue: valTotal,
      person1Name: transForm.person1Name,
      person1Percent: p1Percent,
      person1Value: (valTotal * p1Percent) / 100,
      person2Name: transForm.person2Name,
      person2Percent: p2Percent,
      person2Value: (valTotal * p2Percent) / 100,
      person3Name: transForm.person3Name,
      person3Percent: p3Percent,
      person3Value: (valTotal * p3Percent) / 100,
      timestamp: new Date().toISOString(),
      observations: transForm.observations
    };

    try {
      const transId = await addTransaction(t);
      t.id = transId;
      setTransactions(prev => [t, ...prev]);
      setShowTransactionModal(false);

      // If created from lead, update lead status automatically
      if (selectedLead) {
        await handleStatusChange(selectedLead.id, "Fidelizado");
      }
    } catch (err) {
      alert("Erro ao salvar transação financeira.");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!adminPasswordConfig || adminPasswordConfig.trim().length < 4) {
      setPasswordError("A senha precisa ter pelo menos 4 caracteres.");
      return;
    }
    const success = await updateAdminPassword(adminPasswordConfig);
    if (success) {
      setPasswordSuccess("Senha administrativa atualizada com sucesso!");
      setAdminPasswordConfig("");
    } else {
      setPasswordError("Erro ao salvar nova senha no banco de dados.");
    }
  };

  // Calculations for Financial tab
  const totalRevenue = transactions.reduce((acc, t) => acc + t.totalValue, 0);
  const totalP1 = transactions.reduce((acc, t) => acc + (t.person1Value || 0), 0);
  const totalP2 = transactions.reduce((acc, t) => acc + (t.person2Value || 0), 0);
  const totalP3 = transactions.reduce((acc, t) => acc + (t.person3Value || 0), 0);

  // Dynamic values calculation in form modal
  const formTotalVal = parseFloat(transForm.totalValue) || 0;
  const p1ValueCalc = (formTotalVal * (parseFloat(transForm.person1Percent) || 0)) / 100;
  const p2ValueCalc = (formTotalVal * (parseFloat(transForm.person2Percent) || 0)) / 100;
  const p3ValueCalc = (formTotalVal * (parseFloat(transForm.person3Percent) || 0)) / 100;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF4EE] flex items-center justify-center px-4 font-sans relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#68C9EA]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#D4AF37]/10 relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-4 shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#3C3C3C] text-center">
              Painel Administrativo
            </h1>
            <p className="text-[#3C3C3C]/60 text-xs text-center uppercase tracking-widest mt-1.5 font-medium">
              Acesso Restrito - Fabrine Fernandes
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#3C3C3C] uppercase tracking-wider mb-2 font-semibold">
                Chave de Acesso (Senha)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insira a senha de 4 dígitos"
                  className="w-full pl-4 pr-10 py-3.5 bg-[#FAF4EE] border border-[#D4AF37]/15 rounded-xl font-mono text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <Lock className="w-5 h-5 text-[#3C3C3C]/30 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 text-red-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FAF4EE]/10 hover:from-[#D4AF37] hover:to-[#D4AF37] bg-[#D4AF37] text-[#3C3C3C] font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  Desbloquear Painel
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a href="#" className="text-xs text-[#D4AF37] hover:underline">
              ← Voltar para o Site Principal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF4EE] font-sans flex flex-col">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-[#D4AF37]/15 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
            <img
              src="https://raw.githubusercontent.com/easybyzcreator/imagens/17563760155e9adfc5a58f5f85a53a7de6c2d3c8/ffbb.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#3C3C3C] flex items-center gap-2">
              Painel M.A.P.A. & CRM Financeiro
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#3C3C3C]/50 font-medium">
              Controle Estratégico do Negócio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-2 bg-[#FAF4EE] hover:bg-[#FAF4EE]/80 border border-[#D4AF37]/15 text-[#3C3C3C]/70 rounded-lg hover:text-[#3C3C3C] transition-all cursor-pointer"
            title="Atualizar Dados"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl flex items-center gap-2 border border-red-200 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sair do Painel
          </button>
        </div>
      </header>

      {/* Main Content Area split into Tabs Sidebar + Tab Area */}
      <div className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Rail / Sidebar */}
        <aside className="lg:col-span-3 bg-white p-4 rounded-3xl border border-[#D4AF37]/10 shadow-lg space-y-1.5">
          <p className="text-[10px] font-bold text-[#3C3C3C]/40 uppercase tracking-widest px-3 mb-3">
            Menu de Navegação
          </p>

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                : "text-[#3C3C3C]/70 hover:bg-[#FAF4EE] hover:text-[#3C3C3C]"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Visão Geral / Métricas
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === "leads"
                ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                : "text-[#3C3C3C]/70 hover:bg-[#FAF4EE] hover:text-[#3C3C3C]"
            }`}
          >
            <Users className="w-4 h-4" />
            Triagens & Leads
            {leads.filter(l => l.status === "Novo").length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {leads.filter(l => l.status === "Novo").length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === "transactions"
                ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                : "text-[#3C3C3C]/70 hover:bg-[#FAF4EE] hover:text-[#3C3C3C]"
            }`}
          >
            <DollarSign className="w-4 h-4" />
            CRM & Comissões
          </button>

          <button
            onClick={() => setActiveTab("clicks")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === "clicks"
                ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                : "text-[#3C3C3C]/70 hover:bg-[#FAF4EE] hover:text-[#3C3C3C]"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Cliques WhatsApp
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#D4AF37] text-white shadow-md shadow-[#D4AF37]/10"
                : "text-[#3C3C3C]/70 hover:bg-[#FAF4EE] hover:text-[#3C3C3C]"
            }`}
          >
            <Settings className="w-4 h-4" />
            Configurar Acesso
          </button>

          <div className="pt-6 border-t border-[#D4AF37]/10 mt-6 px-3">
            <a 
              href="#" 
              className="text-xs text-[#D4AF37] hover:underline block font-semibold"
            >
              ← Voltar ao Site Principal
            </a>
          </div>
        </aside>

        {/* Tab Content Area */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-[2rem] border border-[#D4AF37]/10 shadow-lg min-h-[500px]">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mb-3" />
              <p className="text-sm text-[#3C3C3C]/60">Sincronizando com Firestore...</p>
            </div>
          )}

          {!loading && (
            <>
              {/* TABS: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="border-b border-[#D4AF37]/10 pb-4">
                    <h2 className="font-serif text-2xl font-bold text-[#3C3C3C]">Visão Geral</h2>
                    <p className="text-xs text-[#3C3C3C]/50 mt-1">Desempenho e métricas em tempo real das interações e finanças</p>
                  </div>

                  {/* Metrics cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#D4AF37]/10">
                      <div className="flex justify-between items-start mb-3">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">
                          Triagens
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#3C3C3C]">{leads.length}</p>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1.5">Fichas de pré-atendimento registradas</p>
                    </div>

                    <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#D4AF37]/10">
                      <div className="flex justify-between items-start mb-3">
                        <MessageSquare className="w-5 h-5 text-green-500" />
                        <span className="text-[10px] bg-green-50 text-green-600 font-bold px-2 py-0.5 rounded-full">
                          Clicks WA
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#3C3C3C]">{clicks.length}</p>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1.5">Cliques totais em botões de contato</p>
                    </div>

                    <div className="bg-[#FAF4EE] p-5 rounded-2xl border border-[#D4AF37]/10">
                      <div className="flex justify-between items-start mb-3">
                        <DollarSign className="w-5 h-5 text-rose-500" />
                        <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">
                          Faturamento
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-[#3C3C3C]">
                        {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1.5">Faturamento registrado no CRM</p>
                    </div>
                  </div>

                  {/* Commission split overview */}
                  <div className="bg-[#FAF4EE]/40 border border-[#D4AF37]/10 rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-bold text-[#3C3C3C] mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-[#D4AF37]" />
                      Divisão de Comissões e Custos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/5 shadow-sm">
                        <p className="text-[11px] font-bold text-[#3C3C3C]/50 uppercase tracking-wider mb-1">
                          Fabrine (Profissional)
                        </p>
                        <p className="text-xl font-bold text-brand-gray">
                          {totalP1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/5 shadow-sm">
                        <p className="text-[11px] font-bold text-[#3C3C3C]/50 uppercase tracking-wider mb-1">
                          Parceiro / Indicação
                        </p>
                        <p className="text-xl font-bold text-brand-gray">
                          {totalP2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/5 shadow-sm">
                        <p className="text-[11px] font-bold text-[#3C3C3C]/50 uppercase tracking-wider mb-1">
                          Clínica / Custos
                        </p>
                        <p className="text-xl font-bold text-brand-gray">
                          {totalP3.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code de Divulgação */}
                  <div className="bg-[#FAF4EE]/40 border border-[#D4AF37]/10 rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-bold text-[#3C3C3C] mb-4 flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-[#D4AF37]" />
                      QR Code de Divulgação do Site
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl border border-[#D4AF37]/5 shadow-sm">
                      <div className="p-3 bg-[#FAF4EE] rounded-2xl border border-[#D4AF37]/10 shrink-0">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.origin)}`}
                          alt="QR Code do Site"
                          className="w-40 h-40 object-contain rounded-lg"
                        />
                      </div>
                      <div className="space-y-3 text-center md:text-left">
                        <h4 className="text-sm font-bold text-brand-gray">
                          Link Oficial do seu Site
                        </h4>
                        <p className="text-xs text-brand-gray/70 leading-relaxed font-mono select-all bg-[#FAF4EE] px-3 py-2 rounded-lg border border-[#D4AF37]/10 break-all inline-block">
                          {window.location.origin}
                        </p>
                        <p className="text-xs text-[#3C3C3C]/50 max-w-md leading-relaxed">
                          Este QR Code direciona os seus clientes e pacientes exatamente para o link da página principal do seu site. Você pode imprimir este QR Code ou colocá-lo em cartões de visita, folhetos e na recepção para facilitar o acolhimento.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          <a
                            href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#3C3C3C] font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
                          >
                            Baixar QR Code (Alta Resolução)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity List */}
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3C3C3C] mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#D4AF37]" />
                      Triagens Mais Recentes
                    </h3>
                    {leads.length === 0 ? (
                      <p className="text-sm text-[#3C3C3C]/50 bg-[#FAF4EE]/40 py-8 text-center rounded-xl">
                        Nenhuma triagem enviada ainda.
                      </p>
                    ) : (
                      <div className="space-y-3.5">
                        {leads.slice(0, 3).map((lead) => (
                          <div key={lead.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#FAF4EE]/40 border border-[#D4AF37]/10 rounded-xl p-4 gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  lead.status === "Novo" ? "bg-blue-100 text-blue-700" :
                                  lead.status === "Em Atendimento" ? "bg-amber-100 text-amber-700" :
                                  lead.status === "Fidelizado" ? "bg-green-100 text-green-700" :
                                  "bg-gray-100 text-gray-700"
                                }`}>
                                  {lead.status || "Novo"}
                                </span>
                                <span className="text-[10px] text-[#3C3C3C]/50">
                                  {new Date(lead.timestamp).toLocaleString("pt-BR")}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-[#3C3C3C]">
                                {lead.childName} ({lead.childAge} anos)
                              </h4>
                              <p className="text-xs text-[#3C3C3C]/70">
                                Responsável: {lead.parentName}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setActiveTab("leads");
                              }}
                              className="px-3.5 py-1.5 bg-white hover:bg-[#FAF4EE] border border-[#D4AF37]/25 text-[#3C3C3C] font-semibold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                            >
                              Ver Detalhes
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TABS: LEADS / TRIAGENS */}
              {activeTab === "leads" && (
                <div className="space-y-6">
                  <div className="border-b border-[#D4AF37]/10 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#3C3C3C]">Triagens de Atendimento</h2>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1">Gerencie leads, marque andamentos e fature no CRM</p>
                    </div>
                    <span className="text-xs font-bold text-[#3C3C3C]/60 bg-[#FAF4EE] border border-[#D4AF37]/10 px-3 py-1.5 rounded-xl">
                      {leads.length} Cadastros
                    </span>
                  </div>

                  {leads.length === 0 ? (
                    <div className="text-center py-20 bg-[#FAF4EE]/30 rounded-2xl border border-[#D4AF37]/10">
                      <Users className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#3C3C3C]/60">Nenhuma triagem cadastrada ainda.</p>
                      <p className="text-xs text-[#3C3C3C]/40 mt-1">Aparecerão aqui assim que preencherem o formulário no site.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {leads.map((lead) => (
                        <div 
                          key={lead.id} 
                          className={`border rounded-2xl p-5 sm:p-6 transition-all ${
                            lead.status === "Novo" 
                              ? "bg-white border-[#D4AF37]/30 shadow-md" 
                              : "bg-[#FAF4EE]/30 border-[#D4AF37]/10"
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                                  lead.status === "Novo" ? "bg-blue-100 text-blue-700" :
                                  lead.status === "Em Atendimento" ? "bg-amber-100 text-amber-700" :
                                  lead.status === "Fidelizado" ? "bg-green-100 text-green-700" :
                                  "bg-gray-100 text-gray-700"
                                }`}>
                                  {lead.status || "Novo"}
                                </span>
                                <span className="text-[11px] text-[#3C3C3C]/50 font-medium">
                                  {new Date(lead.timestamp).toLocaleString("pt-BR")}
                                </span>
                                {lead.mode && (
                                  <span className="text-[10px] bg-brand-gray/10 text-brand-gray font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    {lead.mode === "online" ? "💻 Online" : "📍 Presencial"}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-serif text-lg font-bold text-brand-gray">
                                {lead.childName} <span className="text-sm font-sans font-light">({lead.childAge} anos)</span>
                              </h3>
                              <p className="text-xs text-brand-gray/70">
                                Responsável: <strong className="font-semibold text-brand-gray">{lead.parentName}</strong>
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2 sm:self-center">
                              {/* Action statuses */}
                              <select
                                value={lead.status || "Novo"}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className="px-3 py-1.5 bg-white border border-[#D4AF37]/20 text-xs font-semibold rounded-xl text-brand-gray focus:outline-none focus:ring-1 focus:ring-brand-gold"
                              >
                                <option value="Novo">Status: Novo</option>
                                <option value="Em Atendimento">Em Atendimento</option>
                                <option value="Fidelizado">Fidelizado</option>
                                <option value="Arquivado">Arquivado</option>
                              </select>

                              {/* WhatsApp Contact */}
                              <a
                                href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3.5 py-1.5 bg-green-500 hover:bg-green-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                Contatar
                              </a>

                              {/* Convert to Financial Patient */}
                              <button
                                onClick={() => handleOpenTransactionFromLead(lead)}
                                className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <DollarSign className="w-3.5 h-3.5" />
                                Cobrar / Faturar
                              </button>

                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-red-100"
                                title="Excluir Triagem"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="bg-white rounded-xl p-4 border border-[#D4AF37]/5">
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#3C3C3C]/40 block mb-1">
                              Relato de Dificuldades:
                            </span>
                            <p className="text-xs text-brand-gray/80 leading-relaxed font-sans whitespace-pre-wrap">
                              {lead.challenge}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TABS: CRM & COMISSÕES */}
              {activeTab === "transactions" && (
                <div className="space-y-6">
                  <div className="border-b border-[#D4AF37]/10 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#3C3C3C]">Controle Financeiro & CRM</h2>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1">Sessões cobradas, faturamentos e divisões de comissões calculadas</p>
                    </div>
                    <button
                      onClick={handleOpenNewTransaction}
                      className="px-4 py-2.5 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      Novo Lançamento
                    </button>
                  </div>

                  {/* Commission calculation summaries cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/20">
                      <p className="text-[10px] font-bold text-[#3C3C3C]/50 uppercase tracking-widest">
                        Total Geral Cobrado
                      </p>
                      <p className="text-2xl font-bold text-brand-gray mt-1">
                        {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/15 shadow-sm">
                      <p className="text-[10px] font-bold text-brand-gray/50 uppercase tracking-widest">
                        Fabrine (Profissional)
                      </p>
                      <p className="text-xl font-bold text-[#3C3C3C] mt-1">
                        {totalP1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/15 shadow-sm">
                      <p className="text-[10px] font-bold text-brand-gray/50 uppercase tracking-widest">
                        Parceiro / Indicação
                      </p>
                      <p className="text-xl font-bold text-[#3C3C3C] mt-1">
                        {totalP2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-[#D4AF37]/15 shadow-sm">
                      <p className="text-[10px] font-bold text-brand-gray/50 uppercase tracking-widest">
                        Clínica / Custos
                      </p>
                      <p className="text-xl font-bold text-[#3C3C3C] mt-1">
                        {totalP3.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>

                  {transactions.length === 0 ? (
                    <div className="text-center py-20 bg-[#FAF4EE]/30 rounded-2xl border border-[#D4AF37]/10">
                      <DollarSign className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#3C3C3C]/60">Nenhum faturamento registrado ainda.</p>
                      <p className="text-xs text-[#3C3C3C]/40 mt-1">Clique em "Novo Lançamento" ou converta uma triagem para começar.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-[#D4AF37]/10 rounded-2xl shadow-sm bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#FAF4EE] border-b border-[#D4AF37]/10 text-brand-gray font-bold">
                            <th className="p-4">Paciente</th>
                            <th className="p-4">Serviço</th>
                            <th className="p-4">Valor Total</th>
                            <th className="p-4">Fabrine Comis.</th>
                            <th className="p-4">Parceiro Comis.</th>
                            <th className="p-4">Clínica Comis.</th>
                            <th className="p-4">Data</th>
                            <th className="p-4 text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/10 text-[#3C3C3C]">
                          {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-[#FAF4EE]/20 transition-colors">
                              <td className="p-4 font-bold">{t.patientName}</td>
                              <td className="p-4">{t.serviceName}</td>
                              <td className="p-4 font-bold text-[#3C3C3C]">
                                {t.totalValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </td>
                              <td className="p-4 text-brand-gray/95">
                                {t.person1Value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                <span className="text-[10px] text-[#3C3C3C]/50 block">({t.person1Percent}%)</span>
                              </td>
                              <td className="p-4 text-brand-gray/95">
                                {t.person2Value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                <span className="text-[10px] text-[#3C3C3C]/50 block">({t.person2Percent}%)</span>
                              </td>
                              <td className="p-4 text-brand-gray/95">
                                {t.person3Value?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                <span className="text-[10px] text-[#3C3C3C]/50 block">({t.person3Percent}%)</span>
                              </td>
                              <td className="p-4 text-[#3C3C3C]/60">
                                {new Date(t.timestamp).toLocaleDateString("pt-BR")}
                              </td>
                              <td className="p-4 text-center">
                                <button
                                  onClick={() => handleDeleteTransaction(t.id!)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Excluir Lançamento"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TABS: CLICKS TRACKING */}
              {activeTab === "clicks" && (
                <div className="space-y-6">
                  <div className="border-b border-[#D4AF37]/10 pb-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-[#3C3C3C]">Cliques em Botões de Contato</h2>
                      <p className="text-xs text-[#3C3C3C]/50 mt-1">Interesses captados por cliques rápidos no WhatsApp e Redes Sociais</p>
                    </div>
                    <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
                      {clicks.length} Cliques Rastreados
                    </span>
                  </div>

                  {clicks.length === 0 ? (
                    <div className="text-center py-20 bg-[#FAF4EE]/30 rounded-2xl border border-[#D4AF37]/10">
                      <MessageSquare className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
                      <p className="text-sm font-semibold text-[#3C3C3C]/60">Nenhum clique registrado ainda.</p>
                      <p className="text-xs text-[#3C3C3C]/40 mt-1">Aparecerão aqui em tempo real conforme os usuários navegarem.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto border border-[#D4AF37]/10 rounded-2xl shadow-sm bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#FAF4EE] border-b border-[#D4AF37]/10 text-brand-gray font-bold">
                            <th className="p-4">Canal / Recurso Clicado</th>
                            <th className="p-4">Tipo</th>
                            <th className="p-4">Data & Hora</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4AF37]/10 text-[#3C3C3C]">
                          {clicks.map((click) => (
                            <tr key={click.id} className="hover:bg-[#FAF4EE]/20 transition-colors">
                              <td className="p-4 font-bold">{click.label}</td>
                              <td className="p-4">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                  click.type === "whatsapp" ? "bg-green-100 text-green-700" :
                                  click.type === "book" ? "bg-blue-100 text-blue-700" :
                                  "bg-purple-100 text-purple-700"
                                }`}>
                                  {click.type || "whatsapp"}
                                </span>
                              </td>
                              <td className="p-4 text-[#3C3C3C]/60">
                                {new Date(click.timestamp).toLocaleString("pt-BR")}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TABS: SETTINGS / ACCESSIBILITY CONFIG */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="border-b border-[#D4AF37]/10 pb-4">
                    <h2 className="font-serif text-2xl font-bold text-[#3C3C3C]">Segurança e Chave de Acesso</h2>
                    <p className="text-xs text-[#3C3C3C]/50 mt-1">Altere a senha que dá acesso a este painel administrativo</p>
                  </div>

                  <div className="max-w-md bg-[#FAF4EE]/40 border border-[#D4AF37]/10 p-6 rounded-2xl">
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">
                          Nova Senha Administrativa
                        </label>
                        <input
                          type="password"
                          required
                          value={adminPasswordConfig}
                          onChange={(e) => setAdminPasswordConfig(e.target.value)}
                          placeholder="Digite a nova senha desejada"
                          className="w-full px-4 py-3 bg-white border border-[#D4AF37]/15 rounded-xl font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                      </div>

                      {passwordError && (
                        <p className="text-xs text-red-600 font-semibold">{passwordError}</p>
                      )}

                      {passwordSuccess && (
                        <p className="text-xs text-green-700 font-semibold">✓ {passwordSuccess}</p>
                      )}

                      <button
                        type="submit"
                        className="w-full py-3 bg-brand-gray hover:bg-brand-gray/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow cursor-pointer"
                      >
                        Salvar Nova Senha
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </>
          )}

        </main>

      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#D4AF37]/15 py-6 text-center text-xs text-[#3C3C3C]/40 font-sans mt-auto">
        <p>© {new Date().getFullYear()} Fabrine Fernandes - Painel Administrativo de Controle</p>
      </footer>

      {/* TRANSACTION / BILLING MODAL */}
      <AnimatePresence>
        {showTransactionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl border border-[#D4AF37]/20 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-4">
                <h3 className="font-serif text-xl font-bold text-[#3C3C3C]">
                  {selectedLead ? "Converter Triagem em Venda" : "Novo Lançamento Financeiro"}
                </h3>
                <button 
                  onClick={() => setShowTransactionModal(false)}
                  className="text-[#3C3C3C]/40 hover:text-[#3C3C3C] font-bold text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Patient Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      Nome do Paciente / Cliente
                    </label>
                    <input
                      type="text"
                      required
                      value={transForm.patientName}
                      onChange={(e) => setTransForm({ ...transForm, patientName: e.target.value })}
                      placeholder="Ex: Joãozinho"
                      className="w-full px-4 py-3 bg-[#FAF4EE] border border-[#D4AF37]/15 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-gray"
                    />
                  </div>

                  {/* Service Name */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      Tipo de Serviço / Atendimento
                    </label>
                    <input
                      type="text"
                      required
                      value={transForm.serviceName}
                      onChange={(e) => setTransForm({ ...transForm, serviceName: e.target.value })}
                      placeholder="Ex: Avaliação Clínica, Livro, Curso..."
                      className="w-full px-4 py-3 bg-[#FAF4EE] border border-[#D4AF37]/15 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-gray"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Total Value */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      Valor Total Pago (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={transForm.totalValue}
                      onChange={(e) => setTransForm({ ...transForm, totalValue: e.target.value })}
                      placeholder="Ex: 1500.00"
                      className="w-full px-4 py-3 bg-[#FAF4EE] border border-[#D4AF37]/15 rounded-xl font-bold text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-gray"
                    />
                  </div>

                  {/* Observations */}
                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                      Observações / Detalhes
                    </label>
                    <input
                      type="text"
                      value={transForm.observations}
                      onChange={(e) => setTransForm({ ...transForm, observations: e.target.value })}
                      placeholder="Qualquer nota adicional"
                      className="w-full px-4 py-3 bg-[#FAF4EE] border border-[#D4AF37]/15 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-gray"
                    />
                  </div>
                </div>

                {/* Split commission layout */}
                <div className="p-5 bg-[#FAF4EE] rounded-2xl border border-[#D4AF37]/10 space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray/50 block">
                    Configuração de Comissão dos 3 Destinatários (Soma ideal = 100%)
                  </span>

                  <div className="space-y-4">
                    {/* Person 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          required
                          value={transForm.person1Name}
                          onChange={(e) => setTransForm({ ...transForm, person1Name: e.target.value })}
                          placeholder="Nome Pessoa 1"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs font-semibold text-brand-gray"
                        />
                      </div>
                      <div className="sm:col-span-3 flex items-center gap-1.5">
                        <input
                          type="number"
                          required
                          value={transForm.person1Percent}
                          onChange={(e) => setTransForm({ ...transForm, person1Percent: e.target.value })}
                          placeholder="%"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs text-center text-brand-gray font-bold"
                        />
                        <span className="text-xs text-[#3C3C3C]/60">%</span>
                      </div>
                      <div className="sm:col-span-4 text-right">
                        <span className="text-xs font-bold text-brand-gray">
                          {p1ValueCalc.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>

                    {/* Person 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          required
                          value={transForm.person2Name}
                          onChange={(e) => setTransForm({ ...transForm, person2Name: e.target.value })}
                          placeholder="Nome Pessoa 2"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs font-semibold text-brand-gray"
                        />
                      </div>
                      <div className="sm:col-span-3 flex items-center gap-1.5">
                        <input
                          type="number"
                          required
                          value={transForm.person2Percent}
                          onChange={(e) => setTransForm({ ...transForm, person2Percent: e.target.value })}
                          placeholder="%"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs text-center text-brand-gray font-bold"
                        />
                        <span className="text-xs text-[#3C3C3C]/60">%</span>
                      </div>
                      <div className="sm:col-span-4 text-right">
                        <span className="text-xs font-bold text-brand-gray">
                          {p2ValueCalc.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>

                    {/* Person 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          required
                          value={transForm.person3Name}
                          onChange={(e) => setTransForm({ ...transForm, person3Name: e.target.value })}
                          placeholder="Nome Pessoa 3"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs font-semibold text-brand-gray"
                        />
                      </div>
                      <div className="sm:col-span-3 flex items-center gap-1.5">
                        <input
                          type="number"
                          required
                          value={transForm.person3Percent}
                          onChange={(e) => setTransForm({ ...transForm, person3Percent: e.target.value })}
                          placeholder="%"
                          className="w-full px-3 py-2 bg-white border border-[#D4AF37]/15 rounded-xl text-xs text-center text-brand-gray font-bold"
                        />
                        <span className="text-xs text-[#3C3C3C]/60">%</span>
                      </div>
                      <div className="sm:col-span-4 text-right">
                        <span className="text-xs font-bold text-brand-gray">
                          {p3ValueCalc.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#D4AF37]/10 pt-3 flex justify-between items-center text-xs font-semibold text-brand-gray">
                    <span>Soma das Porcentagens:</span>
                    <span className={`${
                      parseFloat(transForm.person1Percent || "0") + parseFloat(transForm.person2Percent || "0") + parseFloat(transForm.person3Percent || "0") === 100 
                        ? "text-green-600" 
                        : "text-amber-600"
                    }`}>
                      {parseFloat(transForm.person1Percent || "0") + parseFloat(transForm.person2Percent || "0") + parseFloat(transForm.person3Percent || "0")}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowTransactionModal(false)}
                    className="w-1/2 py-3.5 bg-white border border-brand-gray/20 text-[#3C3C3C] text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:bg-[#FAF4EE] transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3.5 bg-gradient-to-r from-brand-gold to-brand-yellow text-brand-gray text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer hover:shadow-lg transition-all"
                  >
                    Confirmar e Salvar
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
