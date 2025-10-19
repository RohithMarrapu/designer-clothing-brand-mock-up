"use client"

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowDownUp, ChevronDown, Calendar, Clock, MapPin, X, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

// ---------------------------------------------
// Types
// ---------------------------------------------
type BaseEventStatus = "upcoming" | "past"
type EventStatus = BaseEventStatus | "all"

const sortOptions = [
  { label: "Date: Soonest First", value: "date-asc" },
  { label: "Date: Latest First", value: "date-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Alphabetical", value: "name-asc" },
] as const

type SortType = typeof sortOptions[number]["value"]

interface MediaItem {
  type: "image" | "video"
  url: string
  thumbnail?: string
  alt: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  price: number
  category: string
  status: BaseEventStatus
  duration: string
  guests: string
  media: MediaItem[]
}

// ---------------------------------------------
// Mock data for events - replace with your actual data source
// ---------------------------------------------
const events: Event[] = [
  {
    id: 1,
    title: "AYSEGUL IKNA Fashion Show 2024",
    date: "2024-09-15",
    time: "19:00",
    location: "Grand Ballroom, Istanbul",
    description: "Our debut fashion showcase featuring the complete AYSEGUL IKNA collection. Experience the artistry and craftsmanship that defines our brand.",
    image: "/images/event1.jpg",
    price: 75,
    category: "fashion-show",
    status: "upcoming",
    duration: "2 hours",
    guests: "Limited to 100 attendees",
    media: [
      { type: "image", url: "/images/event1.jpg", alt: "Fashion Show Main Image" }
    ]
  },
  {
    id: 2,
    title: "Sustainable Fashion Symposium 2023",
    date: "2023-12-08",
    time: "16:00",
    location: "Eco Center Conference Hall",
    description: "An insightful discussion on sustainable practices and ethical fashion in the modern industry featuring industry leaders and innovators.",
    image: "/images/event4.jpg",
    price: 25,
    category: "symposium",
    status: "past",
    duration: "2 hours",
    guests: "Open to public",
    media: [
      { type: "image", url: "/images/event4-1.jpg", alt: "Symposium venue setup" },
      { type: "image", url: "/images/event4-2.jpg", alt: "Panel discussion" },
      { type: "video", url: "/videos/event4-highlights.mp4", thumbnail: "/images/event4-thumb.jpg", alt: "Event highlights" },
      { type: "image", url: "/images/event4-3.jpg", alt: "Audience engagement" },
      { type: "image", url: "/images/event4-4.jpg", alt: "Networking session" }
    ]
  }
]

// Status tabs (now includes "All")
const eventStatuses: { label: string; value: EventStatus }[] = [
  { label: "All Events", value: "all" },
  { label: "Upcoming Events", value: "upcoming" },
  { label: "Past Events", value: "past" }
]

export default function Events() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events)
  const [selectedStatus, setSelectedStatus] = useState<EventStatus>("upcoming")
  const [sortType, setSortType] = useState<SortType>("date-asc")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  // Filter and sort events
  useEffect(() => {
    let filtered = [...events]

    // Apply status filter only when not "all"
    if (selectedStatus !== "all") {
      // inside this block, selectedStatus is narrowed to BaseEventStatus
      filtered = filtered.filter(event => event.status === selectedStatus)
    }

    // Apply sort
    switch (sortType) {
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredEvents(filtered)
  }, [selectedStatus, sortType])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const openEventModal = (event: Event) => {
    setSelectedEvent(event)
    setCurrentMediaIndex(0)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeEventModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedEvent(null)
      setCurrentMediaIndex(0)
    }, 220)
    document.body.style.overflow = 'auto'
  }

  const handleRegister = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation()
    if (event.status === 'upcoming') {
      toast('Registration process starting...', {
        style: { background: "#252525", color: "#FFFBF4" },
      })
      // Integrate with your registration system here
    }
  }

  const nextMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) =>
        prev === selectedEvent.media.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevMedia = () => {
    if (selectedEvent) {
      setCurrentMediaIndex((prev) =>
        prev === 0 ? selectedEvent.media.length - 1 : prev - 1
      )
    }
  }

  // Close modal when clicking outside content
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isModalOpen && e.target instanceof HTMLElement) {
        const modalContent = document.querySelector('.modal-content')
        if (modalContent && !modalContent.contains(e.target)) {
          closeEventModal()
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isModalOpen])

  // Handle keyboard navigation for media
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen || !selectedEvent) return

      if (e.key === 'ArrowLeft') {
        prevMedia()
      } else if (e.key === 'ArrowRight') {
        nextMedia()
      } else if (e.key === 'Escape') {
        closeEventModal()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, selectedEvent, currentMediaIndex])

  const renderMedia = (media: MediaItem, isMain: boolean = false) => {
    if (media.type === 'image') {
      return (
        <div className={cn(
          "relative w-full h-full flex items-center justify-center",
          isMain ? "aspect-[4/3]" : "aspect-square"
        )}>
          <div className="bg-gradient-to-br from-[#EEDEC5] to-[#252525] absolute inset-0" />
          <div className="relative z-10 text-center text-white p-8">
            <span
              className="text-2xl font-bold block mb-2"
              style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}
            >
              {isMain && selectedEvent ? formatDate(selectedEvent.date) : ''}
            </span>
            {isMain && (
              <>
                <div className="w-16 h-1 bg-[#FFFBF4] mx-auto mb-4"></div>
                <span
                  className="text-lg block"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  {isMain && selectedEvent ? selectedEvent.time : ''}
                </span>
              </>
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className={cn(
          "relative w-full h-full flex items-center justify-center bg-black",
          isMain ? "aspect-[4/3]" : "aspect-square"
        )}>
          <div className="bg-gradient-to-br from-[#EEDEC5] to-[#252525] absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center justify-center text-white p-8">
            <Play size={48} className="mb-4" fill="white" />
            <span
              className="text-lg font-bold text-center"
              style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}
            >
              Watch Video
            </span>
            {isMain && selectedEvent && (
              <>
                <div className="w-16 h-1 bg-[#FFFBF4] mx-auto my-4"></div>
                <span
                  className="text-lg block text-center"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  {selectedEvent.time}
                </span>
              </>
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="pt-24 pb-16 relative z-10 bg-[#FFFFFF] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Status Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#F8F5F0] rounded-lg p-1 inline-flex">
            {eventStatuses.map(status => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={cn(
                  'px-6 py-2 rounded-md text-sm font-medium transition-all',
                  selectedStatus === status.value
                    ? 'bg-[#252525] text-[#FFFBF4] shadow-sm'
                    : 'text-black/70 hover:text-black'
                )}
                style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Mobile Sort Toggle */}
          <div className="md:hidden flex justify-between items-center mb-6 gap-4">
            <div className="relative z-30">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 bg-[#252525] text-[#FFFBF4] border-[#EEDEC5]"
                style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
              >
                <ArrowDownUp size={16} />
                Sort
                <ChevronDown size={14} className={cn("transition-transform", showSortMenu ? "rotate-180" : "")} />
              </Button>

              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EEDEC5] rounded-lg shadow-lg z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value)
                        setShowSortMenu(false)
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-[#EEDEC5]/30 text-black transition-colors',
                        sortType === option.value && 'font-medium bg-[#EEDEC5]/50'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm text-black">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
            </div>
          </div>

          {/* Events Grid - Full width */}
          <div className="w-full">
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-8">
              <div className="text-sm text-black" style={{ fontFamily: 'Anton, sans-serif' }}>
                Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
                {selectedStatus !== 'all' && ` (${selectedStatus})`}
              </div>

              <div className="relative z-30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 bg-[#252525] text-[#FFFBF4] border-[#EEDEC5]"
                  style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                >
                  <ArrowDownUp size={16} />
                  Sort
                  <ChevronDown size={14} className={cn("transition-transform", showSortMenu ? "rotate-180" : "")} />
                </Button>

                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EEDEC5] rounded-lg shadow-lg z-50">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortType(option.value)
                          setShowSortMenu(false)
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-[#EEDEC5]/30 text-black transition-colors',
                          sortType === option.value && 'font-medium bg-[#EEDEC5]/50'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Header */}
            {selectedStatus === 'upcoming' && filteredEvents.length > 0 && (
              <div className="mb-6 p-4 bg-[#EEDEC5]/20 border border-[#EEDEC5] rounded-lg text-center max-w-2xl mx-auto">
                <h2
                  className="text-2xl font-bold text-black mb-2"
                  style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                >
                  UPCOMING EVENTS
                </h2>
                <p
                  className="text-black/80"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  Don't miss our upcoming experiences. Book your spot early as spaces are limited.
                </p>
              </div>
            )}

            {selectedStatus === 'past' && filteredEvents.length > 0 && (
              <div className="mb-6 p-4 bg-[#252525]/5 border border-[#EEDEC5] rounded-lg text-center max-w-2xl mx-auto">
                <h2
                  className="text-2xl font-bold text-black mb-2"
                  style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                >
                  PAST EVENTS
                </h2>
                <p
                  className="text-black/80"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  Relive the memorable moments from our previous events. Each experience has helped shape our brand's journey.
                </p>
              </div>
            )}

            {/* Events Grid - Centered */}
            <div className="flex justify-center">
              <div className={cn(
                "grid gap-6",
                filteredEvents.length === 1
                  ? "grid-cols-1 max-w-md"
                  : "grid-cols-1 md:grid-cols-2 max-w-4xl"
              )}>
                {filteredEvents.map(event => (
                  <div
                    key={event.id}
                    className={cn(
                      "group border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
                      event.status === 'upcoming'
                        ? "border-[#EEDEC5] hover:border-[#252525]"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                    onClick={() => openEventModal(event)}
                  >
                    {/* Event Status Badge */}
                    <div className={cn(
                      "px-4 py-2 text-sm font-bold",
                      event.status === 'upcoming'
                        ? "bg-[#252525] text-[#FFFBF4]"
                        : "bg-gray-300 text-gray-700"
                    )}>
                      <div className="flex items-center justify-between">
                        <span style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}>
                          {event.status === 'upcoming' ? 'UPCOMING' : 'PAST EVENT'}
                        </span>
                        <span style={{ fontFamily: 'NATS, sans-serif' }}>
                          {event.category.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Event Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#EEDEC5] to-[#252525] relative overflow-hidden p-6 flex items-center justify-center">
                      <div className="text-center">
                        <span
                          className="text-white text-2xl font-bold block mb-2"
                          style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}
                        >
                          {formatDate(event.date)}
                        </span>
                        <div className="w-16 h-1 bg-[#FFFBF4] mx-auto mb-4"></div>
                        <span
                          className="text-[#FFFBF4] text-lg block"
                          style={{ fontFamily: 'NATS, sans-serif' }}
                        >
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="p-6">
                      <h3
                        className="text-xl font-bold text-black mb-3 group-hover:text-[#4a4a4a] transition-colors"
                        style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}
                      >
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3 text-sm text-black/80">
                          <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                          <span style={{ fontFamily: 'NATS, sans-serif' }}>{event.location}</span>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-black/80">
                          <Clock size={16} className="mt-0.5 flex-shrink-0" />
                          <span style={{ fontFamily: 'NATS, sans-serif' }}>{event.duration} • {event.guests}</span>
                        </div>
                      </div>

                      <p
                        className="text-sm text-black/70 mb-6 leading-relaxed line-clamp-2"
                        style={{ fontFamily: 'NATS, sans-serif' }}
                      >
                        {event.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <span
                          className={cn(
                            "text-xl font-bold",
                            event.price === 0 ? "text-green-600" : "text-black"
                          )}
                          style={{ fontFamily: 'Hornset, sans-serif' }}
                        >
                          {event.price === 0 ? 'COMPLIMENTARY' : `$${event.price}`}
                        </span>
                        <Button
                          className={cn(
                            event.status === 'upcoming'
                              ? "bg-[#252525] text-[#FFFBF4] hover:bg-[#4a4a4a] border border-[#EEDEC5]"
                              : "bg-gray-300 text-gray-700 hover:bg-gray-400 border border-gray-400 cursor-not-allowed"
                          )}
                          style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                          size="sm"
                          disabled={event.status === 'past'}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRegister(e, event)
                          }}
                        >
                          {event.status === 'upcoming' ? 'REGISTER NOW' : 'EVENT ENDED'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📅</div>
                <p
                  className="text-lg text-black/80 mb-2"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  No {selectedStatus} events found.
                </p>
                <Button
                  onClick={() => {
                    setSelectedStatus(selectedStatus === 'upcoming' ? 'past' : 'upcoming')
                  }}
                  className="bg-[#252525] text-[#FFFBF4] hover:bg-[#4a4a4a] border border-[#EEDEC5] mt-4"
                  style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                >
                  VIEW {selectedStatus === 'upcoming' ? 'PAST' : 'UPCOMING'} EVENTS
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-[9999] bg-black/70 transition-opacity duration-200
                      ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{
            paddingTop: `calc(env(safe-area-inset-top, 0px) + 112px)`
          }}
        >
          {/* Center horizontally; top offset handled by overlay padding */}
          <div className="flex justify-center px-3 md:px-4 h-full overflow-y-auto">
            <div
              className="modal-content bg-[#FFFBF4] w-full max-w-4xl
                         max-h-[80vh] overflow-y-auto rounded-xl relative shadow-xl
                         p-4 md:p-6 my-4"
            >
              {/* Close button */}
              <button
                onClick={closeEventModal}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-[#EEDEC5] transition-colors"
                aria-label="Close"
              >
                <X size={20} className="stroke-black" />
              </button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Event Media Section */}
                <div className="relative">
                  {/* Main Media Display */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-black">
                    {renderMedia(selectedEvent.media[currentMediaIndex], true)}

                    {/* Media Navigation Arrows */}
                    {selectedEvent.media.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            prevMedia()
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                          aria-label="Previous media"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            nextMedia()
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                          aria-label="Next media"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Media Counter */}
                    {selectedEvent.media.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 text-white text-sm">
                        {currentMediaIndex + 1} / {selectedEvent.media.length}
                      </div>
                    )}
                  </div>

                  {/* Media Thumbnails Grid - Only for past events with multiple media */}
                  {selectedEvent.status === 'past' && selectedEvent.media.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedEvent.media.map((media, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentMediaIndex(index)
                          }}
                          className={cn(
                            "aspect-square rounded-md overflow-hidden border-2 transition-all",
                            currentMediaIndex === index
                              ? "border-[#252525] ring-2 ring-[#EEDEC5]"
                              : "border-transparent hover:border-gray-400"
                          )}
                        >
                          {renderMedia(media)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="flex flex-col">
                  {/* Status Badge */}
                  <div className={cn(
                    "px-4 py-2 text-sm font-bold mb-4 inline-block self-start",
                    selectedEvent.status === 'upcoming'
                      ? "bg-[#252525] text-[#FFFBF4]"
                      : "bg-gray-300 text-gray-700"
                  )}>
                    <span style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}>
                      {selectedEvent.status === 'upcoming' ? 'UPCOMING EVENT' : 'PAST EVENT'}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold mb-3 text-black" style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.05em' }}>
                    {selectedEvent.title}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 flex-shrink-0 text-black/70" />
                      <div>
                        <p className="font-medium text-black" style={{ fontFamily: 'Hornset, sans-serif' }}>Location</p>
                        <p className="text-black/80" style={{ fontFamily: 'NATS, sans-serif' }}>{selectedEvent.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock size={18} className="mt-0.5 flex-shrink-0 text-black/70" />
                      <div>
                        <p className="font-medium text-black" style={{ fontFamily: 'Hornset, sans-serif' }}>Duration & Capacity</p>
                        <p className="text-black/80" style={{ fontFamily: 'NATS, sans-serif' }}>{selectedEvent.duration} • {selectedEvent.guests}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar size={18} className="mt-0.5 flex-shrink-0 text-black/70" />
                      <div>
                        <p className="font-medium text-black" style={{ fontFamily: 'Hornset, sans-serif' }}>Date & Time</p>
                        <p className="text-black/80" style={{ fontFamily: 'NATS, sans-serif' }}>
                          {formatDate(selectedEvent.date)} at {selectedEvent.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="font-medium text-black mb-2" style={{ fontFamily: 'Hornset, sans-serif' }}>About This Event</p>
                    <p className="text-black/70 leading-relaxed" style={{ fontFamily: 'NATS, sans-serif' }}>
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between items-center mb-4">
                      <span
                        className={cn(
                          "text-2xl font-bold",
                          selectedEvent.price === 0 ? "text-green-600" : "text-black"
                        )}
                        style={{ fontFamily: 'Hornset, sans-serif' }}
                      >
                        {selectedEvent.price === 0 ? 'COMPLIMENTARY' : `$${selectedEvent.price}`}
                      </span>
                    </div>

                    <Button
                      className={cn(
                        "w-full py-3 text-base",
                        selectedEvent.status === 'upcoming'
                          ? "bg-[#252525] text-[#FFFBF4] hover:bg-[#4a4a4a] border border-[#EEDEC5]"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400 border border-gray-400 cursor-not-allowed"
                      )}
                      style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                      size="lg"
                      disabled={selectedEvent.status === 'past'}
                      onClick={(e) => handleRegister(e, selectedEvent)}
                    >
                      {selectedEvent.status === 'upcoming' ? 'REGISTER NOW' : 'EVENT ENDED'}
                    </Button>

                    {selectedEvent.status === 'upcoming' && (
                      <p className="text-sm text-black/60 text-center" style={{ fontFamily: 'NATS, sans-serif' }}>
                        Spaces are limited. Register early to secure your spot.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
