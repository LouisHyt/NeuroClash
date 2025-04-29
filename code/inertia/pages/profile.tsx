import { Head, usePage, useForm } from '@inertiajs/react'
import Navbar from '~/partials/Navbar'
import GridBackground from '~/components/GridBackground'
import Footer from '~/partials/Footer'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useState } from 'react'

type TabTypes = 'info' | 'edit' | 'security'

const Profile = () => {
  const { user } = usePage<SharedProps>().props

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState<TabTypes>('info')

  const { data, setData, post, processing, errors } = useForm({
    username: '',
    bio: '',
  })

  const handleTabChange = (tab: TabTypes) => {
    setActiveTab(tab)
    setIsEditing(false)
    setIsChangingPassword(false)
    setShowDeleteConfirm(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Profile" />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-fuchsia-200/80 grid grid-rows-[auto_1fr_auto]">
        <GridBackground animated={true} type="profile" />
        <Navbar />
        <div className="container mx-auto px-6 md:px-12 py-15 relative z-1">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Panneau de gauche - Avatar et stats */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="backdrop-blur-sm bg-black/40 border border-violet-500/30 rounded-xl p-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative group mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-violet-500/50 group-hover:border-fuchsia-400 transition-all duration-300">
                    <img
                      src={user?.avatarUrl}
                      alt={`${user?.username}'s avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <span className="text-xs text-white">Changer</span>
                    </div>
                  )}
                </div>

                {/* Nom d'utilisateur */}
                <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
                <p className="text-gray-400 text-sm mb-4">
                  Member since {user?.createdAt.toLocaleString()}
                </p>

                {/* Statistiques */}
                <div className="w-full grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-violet-900/20 rounded-lg border border-violet-500/20">
                    <p className="text-xl font-bold text-fuchsia-300">
                      {user?.statistic.totalGames}
                    </p>
                    <p className="text-xs text-gray-400">Parties</p>
                  </div>
                  <div className="text-center p-2 bg-violet-900/20 rounded-lg border border-violet-500/20">
                    <p className="text-xl font-bold text-fuchsia-300">0</p>
                    <p className="text-xs text-gray-400">Victoires</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="w-full mb-4">
                  <h3 className="text-sm uppercase text-gray-400 mb-2">Bio</h3>
                  <p className="text-sm text-gray-300">{user?.bio}</p>
                </div>
              </div>
            </div>

            {/* Panneau de droite - Onglets et contenu */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              {/* Onglets */}
              <div className="flex flex-wrap border-b border-violet-500/30 mb-6 overflow-x-auto">
                <button
                  onClick={() => handleTabChange('info')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'info' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Informations
                </button>
                <button
                  onClick={() => handleTabChange('edit')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'edit' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Modifier le profil
                </button>
                <button
                  onClick={() => handleTabChange('security')}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'security' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Sécurité
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="backdrop-blur-sm bg-black/40 border border-violet-500/30 rounded-xl p-6">
                {/* Onglet Informations */}
                {activeTab === 'info' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Informations du profil</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Nom d'utilisateur</h3>
                        <p className="text-lg text-white">{user?.username}</p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Adresse email</h3>
                        <p className="text-lg text-white">{user?.email}</p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Date d'inscription</h3>
                        <p className="text-lg text-white">{user?.createdAt.toLocaleString()}</p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Role</h3>
                        <p className="text-lg text-white">
                          {user?.isAdmin ? 'Administrator' : 'Member'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-sm uppercase text-gray-400 mb-2">Bio</h3>
                      <p className="text-white">{user?.bio}</p>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => handleTabChange('edit')}
                        className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                      >
                        Edit profile
                      </button>
                    </div>
                  </div>
                )}

                {/* Onglet Modifier le profil */}
                {activeTab === 'edit' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Edit profile</h2>

                    {!isEditing ? (
                      <div className="space-y-6">
                        <p className="text-gray-300">
                          You can edit your username, profile picture and your bio.
                        </p>

                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                        >
                          Start editing
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Champ Username avec label flottant */}
                        <div className="relative">
                          <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                            <input
                              type="text"
                              id="username"
                              placeholder="Username"
                              value={data.username}
                              onChange={(e) => setData('username', e.target.value)}
                              className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                            />
                            <label
                              htmlFor="username"
                              className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                            >
                              Username
                            </label>
                          </div>
                        </div>

                        {/* Champ Bio avec label flottant */}
                        <div className="relative">
                          <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                            <textarea
                              id="bio"
                              placeholder="Bio"
                              name="bio"
                              value={data.bio}
                              onChange={(e) => setData('bio', e.target.value)}
                              className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer h-24 resize-none"
                            />
                            <label
                              htmlFor="bio"
                              className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                            >
                              Bio
                            </label>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 border border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Onglet Sécurité */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Paramètres de sécurité</h2>

                    {/* Changement de mot de passe */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-fuchsia-300 mb-4">
                        Changer le mot de passe
                      </h3>

                      {!isChangingPassword ? (
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="px-4 py-2 border border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                        >
                          Changer le mot de passe
                        </button>
                      ) : (
                        <form className="space-y-4">
                          {/* Mot de passe actuel */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="currentPassword"
                                placeholder="Mot de passe actuel"
                                value={passwordData.currentPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    currentPassword: e.target.value,
                                  })
                                }
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="currentPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                Mot de passe actuel
                              </label>
                            </div>
                          </div>

                          {/* Nouveau mot de passe */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="newPassword"
                                placeholder="Nouveau mot de passe"
                                value={passwordData.newPassword}
                                onChange={(e) =>
                                  setPasswordData({ ...passwordData, newPassword: e.target.value })
                                }
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="newPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                Nouveau mot de passe
                              </label>
                            </div>
                          </div>

                          {/* Confirmer le nouveau mot de passe */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirmer le mot de passe"
                                value={passwordData.confirmPassword}
                                onChange={(e) =>
                                  setPasswordData({
                                    ...passwordData,
                                    confirmPassword: e.target.value,
                                  })
                                }
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="confirmPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                Confirmer le mot de passe
                              </label>
                            </div>
                          </div>

                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setIsChangingPassword(false)}
                              className="px-4 py-2 border border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              type="button"
                              onClick={handleChangePassword}
                              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                            >
                              Mettre à jour
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    {/* Suppression de compte */}
                    <div>
                      <h3 className="text-lg font-semibold text-red-400 mb-4">Zone dangereuse</h3>

                      {!showDeleteConfirm ? (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg font-medium text-sm hover:bg-red-500/10 transition-colors"
                        >
                          Supprimer mon compte
                        </button>
                      ) : (
                        <div className="border border-red-500/30 rounded-lg p-4 bg-red-900/10">
                          <p className="text-gray-300 mb-4">
                            Cette action est irréversible. Toutes vos données seront définitivement
                            supprimées.
                          </p>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 border border-gray-500/50 text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-500/10 transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={handleDeleteAccount}
                              className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium text-sm"
                            >
                              Confirmer la suppression
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Profile
