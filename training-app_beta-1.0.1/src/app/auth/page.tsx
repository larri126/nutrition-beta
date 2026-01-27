// src/app/auth/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotify } from '@/context/NotifyContext';
// src/app/auth/page.tsx (Solo cambia la línea de imports)

import { Upload, Plus, Check, ArrowRight, ArrowLeft, Eye, EyeOff, RefreshCcw, Trash2 } from 'lucide-react';
import AuthEmbed from '@/components/auth/AuthEmbed';
import { PLANS } from '@/lib/mockDb/plans';
import { findUser, MOCK_USERS } from '@/lib/mockDb/users';
import { twMerge } from 'tailwind-merge';
import FullscreenToggle from '@/components/FullscreenToggle';

// Tipos
type AuthView = 'login_register' | 'role_selection' | 'data_input' | 'plans';
type UserRole = 'user' | 'trainer' | null;

export default function AuthPage() {
  const router = useRouter();
  const { showNotify } = useNotify();

  // --- ESTADOS ---
  const [view, setView] = useState<AuthView>('login_register');
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Datos
  const [identifier, setIdentifier] = useState(''); 
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({
    username: '@', 
    name: '',
    email: '', 
    socials: [] as { network: string; url: string }[],
    socialNetworkSelect: '', 
    files: [] as string[],
  });
  const [userStatus, setUserStatus] = useState<'neutral' | 'valid' | 'invalid'>('neutral');

  // --- LÓGICA DE NAVEGACIÓN (VOLVER) ---
  const goBack = () => {
    if (view === 'role_selection') setView('login_register');
    if (view === 'data_input') setView('role_selection');
    if (view === 'plans') setView('data_input');
  };

  // --- VALIDACIONES Y FUNCIONES (Misma lógica anterior) ---
  const checkUserAvailability = () => {
    if (formData.username.length <= 1) { showNotify('Rellene el campo', 'error'); return; }
    const usernameToSearch = formData.username;
    
    const existsInMock = MOCK_USERS.some(u => `@${u.username}` === usernameToSearch || u.username === usernameToSearch);
    const storedUsers = JSON.parse(sessionStorage.getItem('training_app_users') || '[]');
    const existsInSession = storedUsers.some((u: any) => u.username === usernameToSearch);

    if (existsInMock || existsInSession) {
      setUserStatus('invalid');
      showNotify('El nombre de usuario ya existe', 'error');
    } else {
      setUserStatus('valid');
    }
  };

  const handleLogin = () => {
    if (!identifier || !password) { showNotify('Campos vacíos', 'error'); return; }
    setLoading(true);
    setTimeout(() => {
      const storedUsers = JSON.parse(sessionStorage.getItem('training_app_users') || '[]');
      const allUsers = [...MOCK_USERS, ...storedUsers];
      let user = null;
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
      const isUserTag = identifier.startsWith('@');

      if (isEmail) user = allUsers.find((u: any) => u.email === identifier);
      else if (isUserTag) user = allUsers.find((u: any) => u.role === 'user' && (u.username === identifier || `@${u.username}` === identifier));
      else user = allUsers.find((u: any) => u.role === 'trainer' && u.name === identifier);
      
      if (user && user.password === password) {
        showNotify(`Bienvenido, ${user.name || user.username}`, 'success');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        router.push('/app'); 
      } else {
        showNotify('Credenciales incorrectas o usuario no encontrado', 'error');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegisterStart = () => {
    if (!identifier || !identifier.includes('@')) { showNotify('Correo inválido', 'error'); return; }
    // Check duplicates...
    const stored = JSON.parse(sessionStorage.getItem('training_app_users') || '[]');
    if ([...MOCK_USERS, ...stored].some((u: any) => u.email === identifier)) {
        showNotify('El correo ya existe', 'error'); return;
    }
    setFormData({ ...formData, email: identifier });
    setView('role_selection');
  };

  const handleAddSocial = () => {
    if (!formData.socialNetworkSelect) return; 
    setFormData(prev => ({ ...prev, socials: [...prev.socials, { network: prev.socialNetworkSelect, url: '' }], socialNetworkSelect: '' }));
  };

  const handleSaveData = () => {
    if (role === 'user' && (formData.username === '@' || userStatus === 'invalid')) {
         showNotify('Revise el usuario', 'error'); return;
    }
    if (role === 'trainer' && !formData.name) { showNotify('Nombre obligatorio', 'error'); return; }
    setView('plans');
  };

  const handleSubscribe = (plan: any) => {
    setLoading(true);
    setTimeout(() => {
      const newUser = {
        username: role === 'user' ? formData.username : undefined,
        name: formData.name || formData.username, 
        email: formData.email, password, role, plan: plan.id, socials: formData.socials
      };
      const stored = JSON.parse(sessionStorage.getItem('training_app_users') || '[]');
      sessionStorage.setItem('training_app_users', JSON.stringify([...stored, newUser]));
      sessionStorage.setItem('currentUser', JSON.stringify(newUser));
      router.push('/app'); 
    }, 1500);
  };

  // --- RENDERIZADO ---
  return (
    <main className="min-h-screen bg-black text-zinc-100 flex flex-col items-center justify-center p-4 relative overflow-hidden no-scrollbar">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black -z-10" />

      {/* --- AQUÍ VA EL BOTÓN --- */}
      <FullscreenToggle />

      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black -z-10" />

      {/* VISTA 1: LOGIN (Con Casita y sin flecha) */}
      {view === 'login_register' && (
        <AuthEmbed 
          title="Acceso" 
          subtitle="Bienvenido"
          showHome={true} // Activa la casita
        >
          <div className="space-y-4">
            <input type="text" placeholder="Correo / @Usuario / Nombre Entrenador" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none focus:border-zinc-600 transition-colors"
              value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            
            <div className="relative flex items-center gap-2">
              <input type={showPassword ? "text" : "password"} placeholder="Contraseña" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none focus:border-zinc-600 transition-colors"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button onClick={() => setShowPassword(!showPassword)} className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="flex gap-4 pt-2">
              <button onClick={handleLogin} disabled={loading} className="flex-1 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:scale-105 transition-transform">
                {loading ? '...' : 'Inicio'}
              </button>
              <button onClick={handleRegisterStart} className="flex-1 py-3 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform">
                Registrarse
              </button>
            </div>
          </div>
        </AuthEmbed>
      )}

      {/* VISTA 2: ROL (Con Flecha de volver) */}
      {view === 'role_selection' && (
        <AuthEmbed 
            title="Rol" // Esto se reemplaza por la flecha, pero se deja por estructura
            subtitle="Registro" 
            onBack={goBack} // Activa la flecha
        >
          <div className="grid grid-cols-2 gap-4 h-40">
            <button onClick={() => { setRole('user'); setView('data_input'); }} className="h-full bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform">👤</span><span className="font-bold">Usuario</span>
            </button>
            <button onClick={() => { setRole('trainer'); setView('data_input'); }} className="h-full bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:scale-105 transition-all flex flex-col items-center justify-center gap-2 group">
              <span className="text-2xl group-hover:scale-110 transition-transform">🎓</span><span className="font-bold">Entrenador</span>
            </button>
          </div>
        </AuthEmbed>
      )}

      {/* VISTA 3: DATOS (Con Flecha de volver) */}
      {view === 'data_input' && (
        <AuthEmbed 
        title="Datos" 
        subtitle="Configuración" 
        // IMPORTANTE: Aquí he quitado 'overflow-y-auto no-scrollbar' porque ahora lo hace el componente por dentro
        className="max-h-[85vh]" 
        onBack={goBack}
    >
          <div className="space-y-5">
            {role === 'user' ? (
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 uppercase ml-1">Nombre de Usuario</label>
                <div className="flex gap-2">
                  <input type="text" className={twMerge("flex-1 bg-zinc-950 border rounded-lg p-3 outline-none transition-colors", userStatus === 'valid' ? "border-green-800 text-green-100" : userStatus === 'invalid' ? "border-red-800" : "border-zinc-800")}
                    value={formData.username} onChange={(e) => { let v = e.target.value; if(!v.startsWith('@')) v='@'+v.replace(/@/g,''); if(v.length<1) v='@'; setFormData({...formData, username: v}); setUserStatus('neutral'); }} onBlur={() => {if(formData.username.length>1) checkUserAvailability()}} />
                  <button onClick={checkUserAvailability} className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700"><RefreshCcw className="w-5 h-5 text-zinc-400" /></button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-zinc-500 uppercase ml-1">Nombre Completo</label>
                <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 outline-none focus:border-zinc-600"
                  value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-zinc-800/50">
              <label className="text-xs text-zinc-500 uppercase ml-1">Redes Sociales</label>
              {formData.socials.map((s, i) => (
                <div key={i} className="flex gap-2 items-center animate-in slide-in-from-left-2"><div className="w-24 bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-center text-zinc-400">{s.network}</div>
                  <input type="text" placeholder="Usuario/Link" className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm outline-none" value={s.url} onChange={(e)=>{const n=[...formData.socials];n[i].url=e.target.value;setFormData({...formData,socials:n})}} />
                  <button onClick={()=>{const n=[...formData.socials];n.splice(i,1);setFormData({...formData,socials:n})}}><Trash2 className="w-4 h-4 text-zinc-600 hover:text-red-400" /></button>
                </div>
              ))}
              <div className="flex gap-2">
                <select className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm flex-1 text-zinc-300 outline-none" value={formData.socialNetworkSelect} onChange={(e)=>setFormData({...formData,socialNetworkSelect:e.target.value})}>
                  <option value="">Seleccionar Red...</option><option>Instagram</option><option>Twitter/X</option><option>TikTok</option><option>LinkedIn</option><option>Web</option>
                </select>
                <button onClick={handleAddSocial} disabled={!formData.socialNetworkSelect} className="p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 disabled:opacity-30"><Plus className="w-5 h-5 text-zinc-300" /></button>
              </div>
            </div>

            {role === 'trainer' && (
              <div className="space-y-2 pt-2 border-t border-zinc-800/50">
                <label className="text-xs text-zinc-500 uppercase ml-1">Certificados</label>
                <div className="border-2 border-dashed border-zinc-800 rounded-xl p-6 flex flex-col items-center text-zinc-500 hover:border-zinc-600 cursor-pointer group"><Upload className="w-6 h-6 group-hover:scale-110 transition-transform" /><span className="text-xs">Adjuntar</span></div>
              </div>
            )}
            <button onClick={handleSaveData} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:scale-105 transition-transform mt-6">{role==='user'?'CONFIRMAR':'GUARDAR'}</button>
          </div>
        </AuthEmbed>
      )}

      {/* VISTA 4: PLANES (Embed Madre) */}
      {view === 'plans' && (
        <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-500">
           
           {/* Embed Madre que contiene todo */}
           <AuthEmbed
             title="" // Dejamos vacío porque usaremos onBack
             subtitle={role === 'user' ? 'Planes Usuario' : 'Planes Entrenador'}
             onBack={goBack} // La flecha a la izquierda
             className="w-full max-w-5xl h-[80vh] md:h-auto" // Más ancho y alto para contener los planes
           >
             
             {/* Contenedor de las tarjetas internas */}
             <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch justify-center p-2">
                
                {(role === 'user' ? PLANS.user : PLANS.trainer).map((plan) => (
                  // Tarjeta de Plan (Ya no es AuthEmbed, es un div estilizado)
                  <div 
                    key={plan.id}
                    className="w-full md:w-80 shrink-0 flex flex-col p-6 rounded-xl bg-zinc-950/50 border border-zinc-800 hover:border-zinc-600 transition-all hover:scale-[1.02] duration-300"
                  >
                    <div className="flex-1 flex flex-col h-full">
                      {/* Nombre del Plan */}
                      <h3 className="text-xl font-bold text-zinc-100 mb-2 uppercase tracking-wide">
                        {plan.name}
                      </h3>
                      
                      {/* Precio */}
                      <div className="text-4xl font-bold mb-6 text-white">
                        {plan.price === 0 ? 'Gratis' : `${plan.price}€`}
                        <span className="text-sm text-zinc-500 font-normal ml-1">/mes</span>
                      </div>

                      {/* Características */}
                      <ul className="space-y-3 flex-1 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                            <Check className="w-4 h-4 text-zinc-100 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Botón Acción */}
                      <button 
                        onClick={() => handleSubscribe(plan)}
                        className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
                      >
                        <span>{plan.price === 0 ? 'Empezar' : 'Suscribirse'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

             </div>
           </AuthEmbed>
        </div>
      )}

    </main>
  );
}