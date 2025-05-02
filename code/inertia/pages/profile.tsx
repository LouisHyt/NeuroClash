import { Head, usePage, useForm } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import Navbar from '~/partials/Navbar'
import GridBackground from '~/components/GridBackground'
import Footer from '~/partials/Footer'
import type { SharedProps } from '@adonisjs/inertia/types'
import { useState, useRef } from 'react'
import { DateTime } from 'luxon'
import Flashes from '~/partials/Flashes'
import { FaTrash } from 'react-icons/fa6'

type TabTypes = 'info' | 'edit' | 'security'

const Profile = () => {
  const { user } = usePage<SharedProps>().props

  const userCreationDate = DateTime.fromISO(user?.createdAt.toLocaleString()!)
    .toFormat('MM/dd/yyyy')
    .toLowerCase()

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [activeTab, setActiveTab] = useState<TabTypes>('info')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    data: profileData,
    setData: setProfileData,
    post: postProfile,
    processing: profileProcessing,
    errors: profileErrors,
  } = useForm({
    username: user?.username || '',
    bio: user?.bio || '',
    avatar: null as File | null,
  })

  const {
    data: passwordData,
    setData: setPasswordData,
    post: postPassword,
    processing: passwordProcessing,
    errors: passwordErrors,
  } = useForm({
    current_password: '',
    new_password: '',
    confirm_password: '',
    E_INVALID_CREDENTIALS: '',
  })

  const handleTabChange = (tab: TabTypes) => {
    setActiveTab(tab)
    setIsEditing(false)
    setIsChangingPassword(false)
    setShowDeleteConfirm(false)
    setProfileData('avatar', null)
    setProfileData('bio', user?.bio || '')
    setProfileData('username', user?.username || '')
  }

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setProfileData('avatar', null)
    setProfileData('bio', user?.bio || '')
    setProfileData('username', user?.username || '')
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileData('avatar', e.target.files[0])
    }
  }

  const handleProfileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postProfile('/profile/update/infos', {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        setActiveTab('info')
        setIsEditing(false)
        setIsChangingPassword(false)
        setShowDeleteConfirm(false)
      },
    })
  }

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    postPassword('/profile/update/password')
    setActiveTab('info')
    setIsEditing(false)
    setIsChangingPassword(false)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <Head title="Profile" />
      <Flashes />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-fuchsia-200/80 grid grid-rows-[auto_1fr_auto]">
        <GridBackground animated={true} type="profile" />
        <Navbar />
        <div className="container mx-auto px-6 md:px-12 py-15 relative z-1">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Panneau de gauche - Avatar et stats */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="backdrop-blur-sm bg-black/40 border border-violet-500/30 rounded-xl p-6 flex flex-col items-center">
                {/* Avatar */}
                <div className="relative mb-4">
                  {/* Conteneur de l'avatar avec son propre groupe de survol */}
                  <div className="relative group" onClick={handleAvatarClick}>
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-violet-500/50 group-hover:border-fuchsia-400 transition-all duration-300">
                      <img
                        src={
                          profileData.avatar
                            ? URL.createObjectURL(profileData.avatar as File)
                            : user?.avatarUrl
                        }
                        alt={`${user?.username}'s avatar`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {isEditing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="text-sm text-white">Change</span>
                      </div>
                    )}
                    {/* Input file caché pour l'upload d'avatar */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="hidden"
                    />
                  </div>

                  {isEditing && user?.avatar && (
                    <div className="absolute z-10 bottom-0 right-0">
                      <Link
                        route="profile.delete.avatar"
                        className="rounded-full bg-red-600/80 p-2 text-white border border-red-400/30 backdrop-blur-sm shadow-lg transform transition-all duration-300 hover:scale-110 cursor-pointer group"
                        title="Delete avatar"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaTrash size={14} />
                      </Link>
                    </div>
                  )}
                </div>
                {profileErrors.avatar && (
                  <div className="text-red-500 text-sm mb-1">{profileErrors.avatar}</div>
                )}

                {/* Nom d'utilisateur */}
                <h2 className="text-2xl font-bold text-white mb-1">{user?.username}</h2>
                <p className="text-gray-400 text-sm mb-4">Member since {userCreationDate}</p>

                {/* Statistiques */}
                <div className="w-full grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center p-2 bg-violet-900/20 rounded-lg border border-violet-500/20">
                    <p className="text-xl font-bold text-fuchsia-300">
                      {user?.statistic.totalGames}
                    </p>
                    <p className="text-xs text-gray-400">Games</p>
                  </div>
                  <div className="text-center p-2 bg-violet-900/20 rounded-lg border border-violet-500/20">
                    <p className="text-xl font-bold text-fuchsia-300">0</p>
                    <p className="text-xs text-gray-400">Victories</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="w-full mb-4">
                  <h3 className="text-sm uppercase text-gray-400 mb-2">Bio</h3>
                  {!user?.bio || user?.bio.length === 0 ? (
                    <p className="text-sm text-gray-300 italic font-thin">
                      You can add a bio by editing your informations
                    </p>
                  ) : (
                    <p className="text-gray-300 text-sm">{user?.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Panneau de droite - Onglets et contenu */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              {/* Onglets */}
              <div className="flex flex-wrap border-b border-violet-500/30 mb-6 overflow-x-auto">
                <button
                  onClick={() => handleTabChange('info')}
                  className={`px-3 sm:px-4 py-2 text-xs cursor-pointer sm:text-sm font-medium whitespace-nowrap ${activeTab === 'info' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Informations
                </button>
                <button
                  onClick={() => handleTabChange('edit')}
                  className={`px-3 sm:px-4 py-2 text-xs cursor-pointer sm:text-sm font-medium whitespace-nowrap ${activeTab === 'edit' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Edit profile
                </button>
                <button
                  onClick={() => handleTabChange('security')}
                  className={`px-3 sm:px-4 py-2 cursor-pointer text-xs sm:text-sm font-medium whitespace-nowrap ${activeTab === 'security' ? 'text-fuchsia-400 border-b-2 border-fuchsia-500' : 'text-gray-400 hover:text-fuchsia-300'}`}
                >
                  Security
                </button>
              </div>

              {/* Contenu des onglets */}
              <div className="backdrop-blur-sm bg-black/40 border border-violet-500/30 rounded-xl p-6">
                {/* Onglet Informations */}
                {activeTab === 'info' && (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Profile informations</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Username</h3>
                        <p className="text-lg text-white">{user?.username}</p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Email Adress</h3>
                        <p className="text-lg text-white">{user?.email}</p>
                      </div>

                      <div>
                        <h3 className="text-sm uppercase text-gray-400 mb-2">Inscription date</h3>
                        <p className="text-lg text-white">{userCreationDate}</p>
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
                      {!user?.bio || user?.bio.length === 0 ? (
                        <p className="text-slate-400">You have no bio for the moment</p>
                      ) : (
                        <p className="text-white">{user?.bio}</p>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => handleTabChange('edit')}
                        className="px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
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
                          className="px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                        >
                          Start editing
                        </button>
                      </div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleProfileSubmit}>
                        {/* Champ Username avec label flottant */}
                        <div className="relative">
                          <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                            <input
                              type="text"
                              id="username"
                              placeholder="Username"
                              required
                              value={profileData.username}
                              onChange={(e) => setProfileData('username', e.target.value)}
                              className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                            />
                            <label
                              htmlFor="username"
                              className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                            >
                              Username
                            </label>
                          </div>
                          {profileErrors.username && (
                            <div className="text-red-500 text-sm mt-1">
                              {profileErrors.username}
                            </div>
                          )}
                        </div>

                        {/* Champ Bio avec label flottant */}
                        <div className="relative">
                          <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                            <textarea
                              id="bio"
                              placeholder="Bio"
                              name="bio"
                              value={profileData.bio}
                              onChange={(e) => setProfileData('bio', e.target.value)}
                              className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer h-24 resize-none"
                            />
                            <label
                              htmlFor="bio"
                              className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                            >
                              Bio
                            </label>
                          </div>
                          {profileErrors.bio && (
                            <div className="text-red-500 text-sm mt-1">{profileErrors.bio}</div>
                          )}
                        </div>

                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => handleCancelEdit()}
                            className="px-4 py-2 border cursor-pointer  border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={profileProcessing}
                            className="px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
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
                    <h2 className="text-2xl font-bold text-white mb-6">Security settings</h2>

                    {/* Changement de mot de passe */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-fuchsia-300 mb-4">Edit password</h3>

                      {!isChangingPassword ? (
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="px-4 py-2 cursor-pointer border border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                        >
                          Change the password
                        </button>
                      ) : (
                        <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                          {/* Mot de passe actuel */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="currentPassword"
                                name="current_password"
                                required
                                placeholder="Current password"
                                value={passwordData.current_password}
                                onChange={(e) =>
                                  setPasswordData('current_password', e.target.value)
                                }
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="currentPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                Current password
                              </label>
                            </div>
                            {passwordErrors.E_INVALID_CREDENTIALS && (
                              <div className="text-red-500 text-sm mt-1">
                                The password is not correct
                              </div>
                            )}
                            {passwordErrors.current_password && (
                              <div className="text-red-500 text-sm mt-1">
                                {passwordErrors.current_password}
                              </div>
                            )}
                          </div>

                          {/* Nouveau mot de passe */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="newPassword"
                                name="new_password"
                                placeholder="New password"
                                required
                                value={passwordData.new_password}
                                onChange={(e) => setPasswordData('new_password', e.target.value)}
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="newPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                New password
                              </label>
                            </div>
                            {passwordErrors.new_password && (
                              <div className="text-red-500 text-sm mt-1">
                                {passwordErrors.new_password}
                              </div>
                            )}
                          </div>

                          {/* Confirmer le nouveau mot de passe */}
                          <div className="relative">
                            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                              <input
                                type="password"
                                id="confirmPassword"
                                name="confirm_password"
                                required
                                placeholder="Confirm the password"
                                value={passwordData.confirm_password}
                                onChange={(e) =>
                                  setPasswordData('confirm_password', e.target.value)
                                }
                                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                              />
                              <label
                                htmlFor="confirmPassword"
                                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                              >
                                Confirm password
                              </label>
                            </div>
                            {passwordErrors.confirm_password && (
                              <div className="text-red-500 text-sm mt-1">
                                {passwordErrors.confirm_password}
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-3">
                            <button
                              type="button"
                              disabled={passwordProcessing}
                              onClick={() => setIsChangingPassword(false)}
                              className="px-4 py-2 border cursor-pointer border-violet-500/50 text-violet-300 rounded-lg font-medium text-sm hover:bg-violet-500/10 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={passwordProcessing}
                              className="px-4 py-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg font-medium text-sm"
                            >
                              Update
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
                          className="px-4 py-2 cursor-pointer border border-red-500/50 text-red-400 rounded-lg font-medium text-sm hover:bg-red-500/10 transition-colors"
                        >
                          Supprimer mon compte
                        </button>
                      ) : (
                        <div className="border border-red-500/30 rounded-lg p-4 bg-red-900/10">
                          <p className="text-gray-300 mb-4">
                            This action is irreversible. All your data will be permanently deleted.
                            Are you sure ?
                          </p>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowDeleteConfirm(false)}
                              className="px-4 py-2 border cursor-pointer border-gray-500/50 text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-500/10 transition-colors"
                            >
                              Cancel
                            </button>
                            <Link
                              route="profile.delete.account"
                              className="px-4 py-2 cursor-pointer bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-medium text-sm"
                            >
                              Yes
                            </Link>
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
