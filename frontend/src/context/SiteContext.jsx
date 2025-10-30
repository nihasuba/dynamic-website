import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchComponents, saveComponents } from '../services/api'

const defaultState = {
  header: { title: 'My Site', imageUrl: '' },
  navbar: [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ],
  footer: { email: 'hello@example.com', phone: '000-000-0000', address: '123 Example St' }
}

const SiteContext = createContext(null)

export const useSite = () => useContext(SiteContext)

export const SiteProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    try {
      const s = localStorage.getItem('siteState')
      return s ? JSON.parse(s) : defaultState
    } catch (e) {
      return defaultState
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [backendEnabled, setBackendEnabled] = useState(true)

  // Load data from backend on mount
  useEffect(() => {
    const loadFromBackend = async () => {
      if (!backendEnabled) return
      
      try {
        setLoading(true)
        const data = await fetchComponents()
        setState(data)
        // Also save to localStorage as backup
        localStorage.setItem('siteState', JSON.stringify(data))
      } catch (error) {
        console.warn('Backend not available, using localStorage:', error.message)
        setBackendEnabled(false)
        // Keep using localStorage data
      } finally {
        setLoading(false)
      }
    }
    
    loadFromBackend()
  }, [])

  // Save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem('siteState', JSON.stringify(state))
    } catch (e) {
      // ignore
    }
  }, [state])

  const updateHeader = (header) => setState((s) => ({ ...s, header: { ...s.header, ...header } }))
  const updateNavbar = (navbar) => setState((s) => ({ ...s, navbar }))
  const updateFooter = (footer) => setState((s) => ({ ...s, footer: { ...s.footer, ...footer } }))
  
  // Save to backend
  const saveToBackend = async () => {
    if (!backendEnabled) {
      console.log('Backend disabled, only saving to localStorage')
      return { success: false, message: 'Backend not available' }
    }
    
    try {
      setLoading(true)
      const result = await saveComponents(state)
      return { success: true, message: result.message }
    } catch (error) {
      console.error('Failed to save to backend:', error.message)
      setBackendEnabled(false)
      return { success: false, message: 'Backend error: ' + error.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <SiteContext.Provider value={{ 
      state, 
      updateHeader, 
      updateNavbar, 
      updateFooter,
      saveToBackend,
      loading,
      backendEnabled
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export default SiteContext
