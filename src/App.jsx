import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [showAbstract, setShowAbstract] = useState(true)
  const baseUrl = import.meta.env.BASE_URL || '/'
  const paperUrl = 'https://arxiv.org/pdf/2505.20916'
  const [lightboxSrc, setLightboxSrc] = useState('')
  const [lightboxCaption, setLightboxCaption] = useState('')
  const [copiedCitation, setCopiedCitation] = useState(false)
  const abstractIntro = `Users often struggle to navigate the privacy / publicity boundary in sharing images online: they may lack awareness of image privacy risks or the ability to apply effective mitigation strategies. To address this challenge, we introduce and evaluate Imago Obscura, an intent-aware AI-powered image-editing copilot that enables users to identify and mitigate privacy risks in images they intend to share.`
  const abstractRest = ` Driven by design requirements from a formative user study with 7 image-editing experts, Imago Obscura enables users to articulate their image-sharing intent and privacy concerns. The system uses these inputs to surface contextually pertinent privacy risks, and then recommends and facilitates application of a suite of obfuscation techniques found to be effective in prior literature — e.g., inpainting, blurring, and generative content replacement. We evaluated Imago Obscura with 15 end-users in a lab study and found that it improved users’ awareness of image privacy risks and their ability to address them, enabling more informed sharing decisions.`
  const citationBibtex = `@article{monteiro2025imago,\n  title={Imago Obscura: An Image Privacy AI Co-pilot to Enable Identification and Mitigation of Risks},\n  author={Monteiro, Kyzyl and Wu, Yuchen and Das, Sauvik},\n  journal={arXiv preprint arXiv:2505.20916},\n  year={2025}\n}`

  // no-op

  // Close lightbox on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setLightboxSrc('')
        setLightboxCaption('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openLightbox = (src, caption) => {
    setLightboxSrc(src)
    setLightboxCaption(caption || '')
  }

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citationBibtex)
      setCopiedCitation(true)
      setTimeout(() => setCopiedCitation(false), 1500)
    } catch {}
  }

  return (
    <div className="app">
      <div className="title-block hero">

          <div className="teaser-container">
            <div
              className="image-wrapper"
              onClick={() => openLightbox(`${baseUrl}figures/teaser.jpg`, 'Imago Obscura: A privacy-focused image AI-copilot that enables users to: (1) articulate their image sharing intent and privacy concerns; (2) become aware of multiple contextually pertinent image privacy risks; and (3) apply recommended obfuscation techniques for the risks they choose to address, enabling informed decision-making about image sharing.')}
            >
              <img
                src={`${baseUrl}figures/teaser.jpg`}
                alt="Imago Obscura teaser showing system flow from input to recommendations and edited output"
                className="teaser-img zoomable"
              />
              <div className="image-caption">
              Imago Obscura: A privacy-focused image AI-copilot that enables users to: 1) articulate their image sharing intent
              and privacy concerns; 2) become aware of multiple contextually pertinent image privacy risks; and 3) apply recommended
              obfuscation techniques for the risks they choose to address, enabling informed decision-making about image sharing.
              </div>
            </div>
          </div>
          <div className="hero-header">
            <h1 className="hero-title">Imago Obscura</h1>
            <p className="hero-subtitle">An Image Privacy AI Co-pilot to Enable Identification and Mitigation of Risks</p>
          </div>

          <div className="authors-list">
            {[
              { name: 'Kyzyl Monteiro', url: 'https://kyzyl.me', institution: 'Carnegie Mellon University', location: 'Pittsburgh, PA, USA' },
              { name: 'Yuchen Wu', url: '', institution: 'Tsinghua University', location: 'Beijing, China' },
              { name: 'Sauvik Das', url: 'https://sauvik.com', institution: 'Carnegie Mellon University', location: 'Pittsburgh, PA, USA' },
            ].map((a) => (
              <div className="author" key={a.name}>
                <div className="author-name">
                  {a.url ? (
                    <a href={a.url} style={{ color: 'inherit' }} target="_blank" rel="noopener noreferrer">{a.name}</a>
                  ) : (
                    a.name
                  )}
                </div>
                <div className="author-institution">{a.institution}</div>
              </div>
            ))}
          </div>

          <div className="cta-group">
            <button className="btn btn-secondary" onClick={() => window.open(paperUrl, '_blank')}>Read Paper</button>
            <button className="btn btn-secondary" onClick={() => window.open('https://www.youtube.com/watch?v=5uK24bBIKj8', '_blank')}>Watch Demo</button>
          </div>

          <div className={`abstract-card`}>
            <p>
              {abstractIntro}
              {showAbstract ? (
                <>{abstractRest}</>
              ) : (
                <>
                  <a
                    href="#read-more"
                    className="read-more-link"
                    onClick={(e) => { e.preventDefault(); setShowAbstract(true) }}
                  >
                    Read more
                  </a>
                </>
              )}
            </p>
          </div>

          {/* Examples Section */}
          <div className="section risks-section">
            <h2 className="section-title">Examples</h2>
            {[
              { title: 'Self-Disclosure Risk', file: 'self-disclosure.jpg', caption: 'Imago Obscura addresses “self disclosure risks”. (1) Identifies that the numbered candle can reveal personal information. (2) Recommends removing the candle from the image. (3) Precisely selects the sensitive area, the candle, and applies inpainting.'},
              { title: 'Identity Exposure Risk', file: 'identity.jpg', caption: 'Imago Obscura addresses “identity exposure risk”. (1) Identifies that the tattoo can reveal the person’s identity. (2) Recommends to replace the tattoo with a new one. (3) Precisely selects the sensitive area, the tattoo, and applies generative content replacement.' },
              { title: 'Confidential Information Leakage Risk', file: 'confidential.jpg', caption: 'Imago Obscura addresses “confidential information leakage risk”. (1) Identifies that the notes on the board can reveal confidential information. (2) Recommends to blur the notes on the board. (3) Precisely selects the sensitive area, the board, and applies blur.' },
              { title: 'Location Exposure Risk', file: 'location.jpg', caption: 'Imago Obscura addresses “location exposure risk”. (1) Identifies that the window view can reveal the location. (2) Recommends to replace the window view. (3) Precisely selects the sensitive area, the window, and applies generative content replacement.' },
              { title: 'Bystander Risk', file: 'bystander.jpg', caption: 'Imago Obscura addresses “bystander privacy risk”. (1) Identifies that the bystanders’ privacy might be at risk. (2) Recommends to generate a new running crowd scene. (3) Precisely selects the sensitive area, the bystander, and applies generative content replacement.'},
            ].map(({ title, file, caption }) => (
              <div className="risk-row" key={title}>
                <div className="risk-title">{title}</div>
                <div className="risk-figure">
                  <div
                    className="image-wrapper"
                    onClick={() => openLightbox(`${baseUrl}figures/${file}`, caption)}
                  >
                    <img
                      src={`${baseUrl}figures/${file}`}
                      alt={title}
                      className="risk-img zoomable"
                      onError={(e) => { e.currentTarget.closest('.risk-row').style.display = 'none' }}
                    />
                    <div className="image-caption">{title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Methodology Section */}
          <div className="section methodology-section">
            <h2 className="section-title">Methodology</h2>
            <div className="methodology-figure">
              <div
                className="image-wrapper"
                onClick={() => openLightbox(`${baseUrl}figures/methodology.jpg`, 'Overview of our methodology. We conducted a formative study to derive design requirements, built a tool based on those requirements, and evaluated it with end-users using their personal photos.')}
              >
                <img
                  src={`${baseUrl}figures/methodology.jpg`}
                  alt="Methodology overview"
                  className="methodology-img zoomable"
                />
                <div className="image-caption">Methodology overview</div>
              </div>
      </div>
        <p>
              We followed a three-phased, human-centered design process: (1) a formative study with seven
              image-editing experts to derive design requirements; (2) building the Imago Obscura system guided by those
              requirements; and (3) a lab study with fifteen participants using their own photos to evaluate the system’s
              effectiveness.
        </p>
      </div>

          {/* Design Requirements Section */}
          {/* <div className="section dr-section">
            <h2 className="section-title">Design requirements</h2>
            <ul className="dr-list">
              <li className="dr-item"><span className="dr-k">DR1:</span> Enabling expressive articulation of privacy concern and sharing intent</li>
              <li className="dr-item"><span className="dr-k">DR2:</span> Increasing awareness of content-level privacy risks</li>
              <li className="dr-item"><span className="dr-k">DR3:</span> Promote informed decision-making</li>
              <li className="dr-item"><span className="dr-k">DR4:</span> Facilitate easy and effective application of obfuscation techniques</li>
              <li className="dr-item"><span className="dr-k">DR5:</span> Ensure autonomy and granular control</li>
            </ul>
          </div> */}

          {/* Implementation Section */}
          <div className="section how-section">
            <h2 className="section-title">Implementation</h2>
            <div className="how-figure">
              <div
                className="image-wrapper"
                onClick={() => openLightbox(`${baseUrl}figures/implementation.jpg`, 'Step-by-step outputs of each model in the Imago Obscura pipeline. (1) The vision model detects and labels objects with bounding boxes. (2) The MLLM identifies sensitive content and recommends obfuscation strategies (shown as a JSON object). (3) The vision model re-localizes the sensitive elements identified by the MLLM. (4) The segmentation model refines the selected region with precision. (5) The image generator replaces the selected region using the chosen obfuscation method.')}
              >
                <img
                  src={`${baseUrl}figures/implementation.jpg`}
                  alt="Implementation overview"
                  className="how-img zoomable"
                  onError={(e) => { e.currentTarget.closest('.how-figure').style.display = 'none' }}
                />
                <div className="image-caption">Implementation overview</div>
              </div>
              <p className="how-description">
                Our system comprises of an ensemble of AI models: a vision model that identifies and annotates objects in users' images,
                a multimodal large language model that identifies pertinent risks, a segmentation model and an image generation model that
                automatically and precisely applies obfuscation techniques. This ensemble is integrated into an open-source image editing tool.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="section results-section">
            <h2 className="section-title">Results</h2>
            <div className="results-grid">
              {[ 
                { file: 'spaf_chart.png', caption: "User Perceptions of Imago Obscura's Support" },
                { file: 'dr_chart.png', caption: 'User Perceptions of Imago Obscura Satisfying the Design Requirements' },
                { file: 'change_chart.png', caption: "Changes in Participants' Perceptions After Using the System" },
              ].map(({file, caption}) => (
                <div className="result-card" key={file}>
                  <div
                    className="image-wrapper"
                    onClick={() => openLightbox(`${baseUrl}figures/${file}`, caption)}
                  >
                    <img
                      src={`${baseUrl}figures/${file}`}
                      alt={caption}
                      className="result-img zoomable"
                      onError={(e) => { e.currentTarget.closest('.result-card').style.display = 'none' }}
                    />
                    <div className="image-caption">{caption}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="results-bullets">
              <ul>
                <li>
                  <strong>Awareness</strong> Participants identified more risks per image.
                </li>
                <li>
                  <strong>Ability</strong> Participants selected more suitable obfuscations.
                </li>
                <li>
                  <strong>Confidence to share</strong> 5× increase in overall confidence • 80× increase on previously withheld images <br />
                  <span className="results-note">Measured via self-reported confidence in our study.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Citation Section */}
          <div className="section citation-section">
            <h2 className="section-title">Citation</h2>
            <div className="code-block">
              <button className="copy-btn" onClick={copyCitation}>{copiedCitation ? 'Copied' : 'Copy'}</button>
              <pre><code>{citationBibtex}</code></pre>
            </div>
          </div>
        </div>
      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div className="lightbox" onClick={() => openLightbox('', '')}>
          <div className="lightbox-content">
            <img src={lightboxSrc} alt={lightboxCaption || 'Preview'} />
            {lightboxCaption && <div className="lightbox-caption">{lightboxCaption}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
