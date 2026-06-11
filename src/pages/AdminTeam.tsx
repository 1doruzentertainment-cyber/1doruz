import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Users, UserPlus, Shield, ShieldOff, Trash2, Mail, Check } from 'lucide-react';

export default function AdminTeam() {
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const callerId = userData?.id;

  const members = useQuery(api.team.listMembers, callerId ? { callerId: callerId as any } : 'skip');
  const inviteMember = useMutation(api.team.inviteMember);
  const updateRole = useMutation(api.team.updateRole);
  const removeMember = useMutation(api.team.removeMember);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState('');
  const [inviteError, setInviteError] = useState('');

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !callerId) return;
    setIsInviting(true);
    setInviteSuccess('');
    setInviteError('');
    try {
      await inviteMember({ callerId: callerId as any, email, role });
      setInviteSuccess(`Invite sent to ${email}`);
      setEmail('');
    } catch (err: any) {
      setInviteError(err.message || 'Failed to send invite.');
    } finally {
      setIsInviting(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    if (!callerId) return;
    try {
      await updateRole({ callerId: callerId as any, userId: userId as any, role: newRole });
    } catch (err: any) {
      alert(err.message || 'Failed to update role.');
    }
  };

  const handleRemove = async (userId: string) => {
    if (!callerId || !window.confirm('Remove this member? This cannot be undone.')) return;
    try {
      await removeMember({ callerId: callerId as any, userId: userId as any });
    } catch (err: any) {
      alert(err.message || 'Failed to remove member.');
    }
  };

  return (
    <div className="min-h-screen bg-page pb-24">
      <main className="p-4 sm:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <header className="mb-12 sm:mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-500 mb-2 block">Administration</span>
            <h1 className="font-serif text-[28px] sm:text-5xl font-bold text-white leading-tight">Team Management</h1>
            <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-mono">Invite & manage team members</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Invite Form */}
            <div>
              <div className="luxury-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <UserPlus className="text-gold-500" size={20} />
                  <h3 className="font-serif text-xl font-bold text-white">Invite Member</h3>
                </div>

                <form onSubmit={handleInvite} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="colleague@example.com"
                        className="w-full bg-zinc-950 border border-zinc-800 pl-12 pr-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 block">Role</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole('user')}
                        className={`py-4 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          role === 'user'
                            ? 'bg-zinc-800 border-gold-500 text-gold-500'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white'
                        }`}
                      >
                        <ShieldOff size={14} className="mx-auto mb-1" />
                        Member
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('admin')}
                        className={`py-4 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                          role === 'admin'
                            ? 'bg-zinc-800 border-gold-500 text-gold-500'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:text-white'
                        }`}
                      >
                        <Shield size={14} className="mx-auto mb-1" />
                        Admin
                      </button>
                    </div>
                  </div>

                  {inviteSuccess && (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                      <Check size={14} className="text-green-500" />
                      <p className="text-green-500 text-xs">{inviteSuccess}</p>
                    </div>
                  )}
                  {inviteError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-xs">{inviteError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!email || isInviting}
                    className="w-full py-4 bg-gold-500 text-zinc-950 text-[10px] font-bold uppercase tracking-widest hover:bg-gold-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isInviting ? 'Sending...' : 'Send Invite'} <UserPlus size={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Members Table */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 border-b border-zinc-900 pb-4 mb-6">
                <Users className="text-gold-500" size={20} />
                <h3 className="font-serif text-xl font-bold text-white">Team Members</h3>
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest ml-auto">
                  {members?.length ?? '...'} total
                </span>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 backdrop-blur-md">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-800 bg-zinc-900/50">
                      <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Email</th>
                      <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Name</th>
                      <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Role</th>
                      <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Verified</th>
                      <th className="p-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members?.map((member) => (
                      <tr key={member._id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                        <td className="p-5 text-sm text-white font-mono">{member.email}</td>
                        <td className="p-5 text-sm text-zinc-400">{member.name || '—'}</td>
                        <td className="p-5">
                          {member._id === callerId ? (
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500">
                              {member.role}
                            </span>
                          ) : (
                            <select
                              value={member.role}
                              onChange={(e) => handleRoleChange(member._id, e.target.value as 'user' | 'admin')}
                              className="bg-zinc-950 border border-zinc-800 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 focus:outline-none focus:border-gold-500 cursor-pointer"
                            >
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </select>
                          )}
                        </td>
                        <td className="p-5">
                          {member.emailVerified ? (
                            <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Verified</span>
                          ) : (
                            <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Pending</span>
                          )}
                        </td>
                        <td className="p-5">
                          {member._id !== callerId && (
                            <button
                              onClick={() => handleRemove(member._id)}
                              className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                              title="Remove member"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {members?.length === 0 && (
                  <div className="p-12 text-center">
                    <Users size={24} className="mx-auto text-zinc-600 mb-3" />
                    <p className="text-zinc-500 text-sm">No team members yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
