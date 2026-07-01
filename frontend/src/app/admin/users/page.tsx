'use client';

import { useEffect, useState } from 'react';
import { authApi } from '@/lib/api';
import useAuthStore from '@/store/authStore';
import { Mail } from 'lucide-react';

export default function AdminUsers() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      authApi.getUsers().then((res) => {
        setUsers(res.data.users || res.data);
        setLoading(false);
      }).catch(console.error);
    }
  }, [user]);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1 className="text-2xl font-cormorant font-semibold mb-6">Users & Customer Support</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-warm-white border-b border-stone/10">
            <tr>
              <th className="p-4 font-medium text-stone">Name</th>
              <th className="p-4 font-medium text-stone">Email</th>
              <th className="p-4 font-medium text-stone">Role</th>
              <th className="p-4 font-medium text-stone">Joined</th>
              <th className="p-4 font-medium text-stone">Support</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone/10">
            {users.map((u: any) => (
              <tr key={u._id} className="hover:bg-warm-white/50">
                <td className="p-4">{u.firstName} {u.lastName}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <a href={`mailto:${u.email}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Mail size={16} /> Email
                  </a>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-stone">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
