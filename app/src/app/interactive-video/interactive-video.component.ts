import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // CommonModule importieren
import { delay } from 'rxjs';
const VIDEO_BASE_URL = 'https://github.com/xoxoSteffen/Digital-Storytelling-App/releases/download/video-assets-v1/';



interface VideoChoice {
  text?: string;
  nextVideoId: string;
  notificationMessage?: string; // Optionaler Notification-Text
  buttonPosition: { top: string; left: string; width: string; height: string }; 
}

interface VideoNode {
  id: string;
  videoUrl: string;
  alternateVersionId?: string; // statt alternateVersions
  choices?: VideoChoice[]; // Beliebig viele Optionen
  showButtonBeforeEnd?: number;
}


@Component({
  selector: 'app-interactive-video',
  templateUrl: './interactive-video.component.html',
  styleUrls: ['./interactive-video.component.css'],
  standalone: true, // Als Standalone-Komponente markieren
  imports: [CommonModule] // CommonModule hier importieren
})
export class InteractiveVideoComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef<HTMLVideoElement>;
  visitCounter: { [id: string]: number } = {};
  
  
  videoNodes: VideoNode[] = [
    {
      id: 'Intro',
      videoUrl: 'assets/videos/Intro.mp4',
      alternateVersionId: 'Intro',
      showButtonBeforeEnd: 40, // anzahl sekunden wann der Button erscheint bevor video endet
      choices: [
        {
          text: '',
          nextVideoId: '1.1',
          buttonPosition: { top: '70%', left: '45%', width: '45%', height: '20%' } 
        },
      ]
    },
    {
      id: '1.1',
      videoUrl: 'assets/videos/1.1.mp4',
      alternateVersionId: '1.2',
      choices: [
        {
          nextVideoId: '2.2',
          buttonPosition: { top: '75%', left: '3%', width: '32%', height: '15%' } 
        },
        {
          nextVideoId: '2.1',
          buttonPosition: { top: '10%', left: '25%', width: '35%', height: '20%' } 
        },
        {
          nextVideoId: '2.3',
          buttonPosition: { top: '80%', left: '68%', width: '20%', height: '15%' } 
        },
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '90%', left: '35%', width: '25%', height: '10%' } 
        }
      ]
    },
    {
      id: '1.2',
      videoUrl: 'assets/videos/1.2.mp4',
      choices: [
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '60%', left: '3%', width: '32%', height: '32%' } 
        },
        {
          nextVideoId: '1.3', 
          buttonPosition: { top: '73%', left: '60%', width: '30%', height: '20%' } 
        },
      ]
    },
    {
      id: '1.3',
      videoUrl: 'assets/videos/1.3.mp4',
      choices: [
        {
          nextVideoId: '2.2',
          buttonPosition: { top: '75%', left: '3%', width: '32%', height: '15%' } 
        },
        {
          nextVideoId: '2.1',
          buttonPosition: { top: '10%', left: '25%', width: '35%', height: '20%' } 
        },
        {
          nextVideoId: '2.3',
          buttonPosition: { top: '80%', left: '68%', width: '20%', height: '15%' } 
        },
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '90%', left: '35%', width: '25%', height: '10%' } 
        }
      ]
    },
    {
      id: '2.1',
      videoUrl: 'assets/videos/2.1.mp4',
      choices: [
        {
          nextVideoId: '2.2',
          buttonPosition: { top: '70%', left: '3%', width: '38%', height: '20%' } 
        },
        {
          nextVideoId: '2.1',
          buttonPosition: { top: '10%', left: '20%', width: '40%', height: '20%' } 
        },
        {
          nextVideoId: '2.3',
          buttonPosition: { top: '80%', left: '56%', width: '40%', height: '15%' } 
        },
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '90%', left: '35%', width: '25%', height: '10%' } 
        }
        
      ]
    },
    {
      id: '2.2',
      videoUrl: 'assets/videos/2.2.mp4',
      choices: [
        {
          nextVideoId: '2.2',
          buttonPosition: { top: '70%', left: '3%', width: '38%', height: '20%' } 
        },
        {
          nextVideoId: '2.1',
          buttonPosition: { top: '10%', left: '20%', width: '40%', height: '20%' } 
        },
        {
          nextVideoId: '2.3',
          buttonPosition: { top: '80%', left: '56%', width: '40%', height: '15%' } 
        },
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '90%', left: '35%', width: '25%', height: '10%' } 
        }
      ]
    },
    {
      id: '2.3',
      videoUrl: 'assets/videos/2.3.mp4',
      choices: [
        {
          nextVideoId: '2.2',
          buttonPosition: { top: '70%', left: '3%', width: '38%', height: '20%' } 
        },
        {
          nextVideoId: '2.1',
          buttonPosition: { top: '10%', left: '20%', width: '40%', height: '20%' } 
        },
        {
          nextVideoId: '2.3',
          buttonPosition: { top: '80%', left: '56%', width: '40%', height: '15%' } 
        },
        {
          nextVideoId: '3.1',
          buttonPosition: { top: '90%', left: '35%', width: '25%', height: '10%' } 
        }
      ]
    },
    {
      id: '3.1',
      videoUrl: 'assets/videos/3.1.mp4',
      choices: [
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '47%', left: '10%', width: '18%', height: '18%' } 
        },
        {
          nextVideoId: '3.2',
          buttonPosition: { top: '47%', left: '35%', width: '30%', height: '20%' } 
        },
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '50%', left: '70%', width: '20%', height: '15%' } 
        }
      ]
    },
    {
      id: '3.2',
      videoUrl: 'assets/videos/3.2.mp4',
      choices: [
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '47%', left: '10%', width: '18%', height: '18%' } 
        },
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '47%', left: '35%', width: '30%', height: '20%' } 
        },
        {
          nextVideoId: '3.3',
          buttonPosition: { top: '50%', left: '70%', width: '20%', height: '15%' } 
        }
      ]
    },
    {
      id: '3.3',
      videoUrl: 'assets/videos/3.3.mp4',
      choices: [
        {
          nextVideoId: '7.1',
          buttonPosition: { top: '47%', left: '10%', width: '18%', height: '18%' } 
        },
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '47%', left: '35%', width: '30%', height: '20%' } 
        },
        {
          nextVideoId: '6.1',
          buttonPosition: { top: '50%', left: '70%', width: '20%', height: '15%' }
        }
      ]
    },
    {
      id: '6.1',
      videoUrl: 'assets/videos/6.1.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        },
       
      ]
    },
    {
      id: '7.1',
      videoUrl: 'assets/videos/7.1.mp4',
      alternateVersionId: '7.1.V2',
      choices: [
        {
          nextVideoId: '12.1',
          buttonPosition: { top: '47%', left: '10%', width: '25%', height: '18%' } 
        },
        {
          nextVideoId: '9.3',
          buttonPosition: { top: '30%', left: '45%', width: '25%', height: '20%' } 
        },
        {
          nextVideoId: '10.1',
          buttonPosition: { top: '55%', left: '70%', width: '20%', height: '15%' }
        }
      ]
    },
    {
      id: '7.1.V2',
      videoUrl: 'assets/videos/7.1.V2.mp4',
      choices: [
        {
          nextVideoId: '12.1',
          buttonPosition: { top: '47%', left: '10%', width: '25%', height: '18%' } 
        },
        {
          nextVideoId: '9.3', // Hier könnte unter vorraussetzung kommt man weiter 
          buttonPosition: { top: '30%', left: '45%', width: '25%', height: '20%' } 
        },
        {
          nextVideoId: '10.1',
          buttonPosition: { top: '55%', left: '70%', width: '20%', height: '15%' }
        }
      ]
    },
    {
      id: '9.3',
      videoUrl: 'assets/videos/9.3.mp4',
      choices: [
        {
          nextVideoId: '12.1',
          buttonPosition: { top: '47%', left: '10%', width: '25%', height: '18%' } 
        },
        {
          nextVideoId: '9.3', // Hier könnte unter vorraussetzung kommt man weiter 
          buttonPosition: { top: '30%', left: '45%', width: '25%', height: '20%' } 
        },
        {
          nextVideoId: '10.1',
          buttonPosition: { top: '55%', left: '70%', width: '28%', height: '16%' }
        }
      ]
    },
    {
      id: '10.1',
      videoUrl: 'assets/videos/10.1.mp4',
      choices: [
        {
          text: '',
          nextVideoId: '11.2',
          notificationMessage: 'TEST',
          buttonPosition: { top: '25%', left: '1%', width: '38%', height: '20%' } 
        },
        {
          text: '',
          nextVideoId: '11.1',
          buttonPosition: { top: '68%', left: '53%', width: '40%', height: '20%' } 
        }
      ]
    },
    {
      id: '11.1',
      videoUrl: 'assets/videos/11.1.mp4',
      choices: [
        {
          text: '',
          nextVideoId: '11.1.2',
          buttonPosition: { top: '20%', left: '0%', width: '50%', height: '20%' } 
        },
        {
          text: '',
          nextVideoId: '11.1.1',
          buttonPosition: { top: '70%', left: '52%', width: '46%', height: '20%' } 
        },
      ]
    },
    {
      id: '11.1.1',
      videoUrl: 'assets/videos/11.1.1.mp4',
      choices: [
        {
          text: '',
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        }
      
      ]
    },
    {
      id: '11.1.2',
      videoUrl: 'assets/videos/11.1.2.mp4',
      choices: [
        {
          text: '',
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        }
      
      ]
    },
    {
      id: '11.2',
      videoUrl: 'assets/videos/11.2.mp4',
      choices: [
        {
          text: '',
          nextVideoId: '11.2.2',
          buttonPosition: { top: '20%', left: '3%', width: '60%', height: '20%' } 
        },
        {
          text: '',
          nextVideoId: '11.2.1',
          buttonPosition: { top: '60%', left: '40%', width: '55%', height: '20%' } 
        }
      ]
    },
    {
      id: '11.2.1',
      videoUrl: 'assets/videos/11.2.1.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        }
       
      ]
    },
    {
      id: '11.2.2',
      videoUrl: 'assets/videos/11.2.2.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        }
       
      ]
    },
    {
      id: '12.1',
      videoUrl: 'assets/videos/12.1.mp4',
      choices: [
        {
          nextVideoId: '12.B',
          buttonPosition: { top: '45%', left: '2%', width: '32%', height: '20%' } 
        },
        {
          nextVideoId: '12.A',
          buttonPosition: { top: '43%', left: '61%', width: '32%', height: '25%' } 
        }
       
      ]
    },
    {
      id: '12.A',
      videoUrl: 'assets/videos/12.A.mp4',
      choices: [
        {
          nextVideoId: '12.A.A',
          buttonPosition: { top: '43%', left: '2%', width: '32%', height: '20%' } 
        },
        {
          nextVideoId: '12.A.B',
          buttonPosition: { top: '43%', left: '61%', width: '35%', height: '25%' } 
        }
       
      ]
    },
    {
      id: '12.B',
      videoUrl: 'assets/videos/12.B.mp4',
      choices: [
        {
          nextVideoId: '12.B.B',
          buttonPosition: { top: '43%', left: '1%', width: '38%', height: '22%' } 
        },
        {
          nextVideoId: '12.B.A',
          buttonPosition: { top: '43%', left: '61%', width: '36%', height: '25%' } 
        }
       
      ]
    },
    {
      id: '12.A.A',
      videoUrl: 'assets/videos/12.A.A.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        },
      ]
    },
    {
      id: '12.A.B',
      videoUrl: 'assets/videos/12.A.B.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        },
      ]
    },
    {
      id: '12.B.A',
      videoUrl: 'assets/videos/12.B.A.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        },
      ]
    },
    {
      id: '12.B.B',
      videoUrl: 'assets/videos/12.B.B.mp4',
      choices: [
        {
          nextVideoId: '1.1',
          buttonPosition: { top: '40%', left: '5%', width: '85%', height: '20%' } 
        },
      ]
    },
    {
      id: '14.1-15.1',
      videoUrl: 'assets/videos/14.1-15.1.mp4',
      choices: [
        {
          nextVideoId: '16.2', // konfrontieren
          buttonPosition: { top: '60%', left: '20%', width: '28%', height: '20%' } 
        },
        {
          nextVideoId: '16.1',
          buttonPosition: { top: '60%', left: '55%', width: '25%', height: '20%' } 
        }
      ]
    },
    {
      id: '16.1',
      videoUrl: 'assets/videos/16.1.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' } 
        },
      ]
    },
    {
      id: '16.2',
      videoUrl: 'assets/videos/16.2.mp4',
      choices: [
        {
        
          nextVideoId: '17.1',// einweihen 
          buttonPosition: { top: '75%', left: '15%', width: '30%', height: '20%' } 
        },
        {
          nextVideoId: '17.2',
          buttonPosition: { top: '75%', left: '55%', width: '35%', height: '20%' } 
        },
      ]
    },
    {
      id: '17.1', // einweihen
      videoUrl: 'assets/videos/17.1.mp4',
      choices: [
        {
          nextVideoId: '17.1A', // ende 
          buttonPosition: { top: '70%', left: '20%', width: '22%', height: '20%' } 
        },
        {
          nextVideoId: '17.1B', // selbst versichern
          buttonPosition: { top: '70%', left: '55%', width: '35%', height: '20%' } 
        }
      ]
    },
    {
      id: '17.2',
      videoUrl: 'assets/videos/17.2.mp4',
      choices: [
        {
          nextVideoId: '18.2A',
          buttonPosition: { top: '70%', left: '19%', width: '25%', height: '20%' } 
        },
        {
          nextVideoId: '18.2B',
          buttonPosition: { top: '70%', left: '55%', width: '25%', height: '20%' } 
        }
      ]
    },
    {
      id: '17.1A',  // ende
      videoUrl: 'assets/videos/17.1A.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' }
        }
      ]
    },
    {
      id: '17.1B', 
      videoUrl: 'assets/videos/17.1B.mp4',
      choices: [
        {
          nextVideoId: '18.1A',
          buttonPosition: { top: '70%', left: '19%', width: '25%', height: '20%' } 
        },
        {
          nextVideoId: '18.1B',
          buttonPosition: { top: '70%', left: '55%', width: '30%', height: '20%' } 
        }
      ],
    },
    {
      id: '18.2A', 
      videoUrl: 'assets/videos/18.2A.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' }
        }
      ],
    },
    {
      id: '18.2B', 
      videoUrl: 'assets/videos/18.2B.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' }
        }
      ],
    },
    {
      id: '18.1A', 
      videoUrl: 'assets/videos/18.1A.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' }
        }
      ],
    },
    {
      id: '18.1B', 
      videoUrl: 'assets/videos/18.1B.mp4',
      choices: [
        {
          text: 'credits',
          nextVideoId: 'Credits',
          buttonPosition: { top: '2.5%', left: '2.5%', width: '95%', height: '95%' }
        }
      ]
    },
    {
      id: 'Credits', 
      videoUrl: 'assets/videos/Credits.mp4'
    },
    
    // Weitere VideoNodes 
    {
      id: 'Intro_v2',
      videoUrl: 'assets/videos/V3_Blue_Transparent.mp4',
      choices: [
        {
          text: '',
          nextVideoId: 'Intro',
          buttonPosition: { top: '20%', left: '3%', width: '60%', height: '20%' } 
        },
        {
          text: '',
          nextVideoId: 'Intro',
          buttonPosition: { top: '60%', left: '40%', width: '55%', height: '20%' } 
        }
      ],
      showButtonBeforeEnd: 40, // anzahl sekunden wann der Button erscheint bevor video endet
      
    },
  ];

  currentVideoNode: VideoNode | null = null;
  showChoices = false;
  isVideoEnded = false;
  isPlaying = false;

  private resolveVideoUrl(pathOrUrl: string): string {
  // Wenn schon eine vollständige URL angegeben ist (http/https), einfach zurückgeben
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  // Sonst nur den Dateinamen aus dem Pfad holen (z. B. "1.1.mp4")
  const filename = pathOrUrl.split('/').pop() || pathOrUrl;

  // Und vorne die GitHub-Release-Basis dranhängen
  return VIDEO_BASE_URL + filename;
}

get currentSrc(): string | undefined {
  return this.currentVideoNode
    ? this.resolveVideoUrl(this.currentVideoNode.videoUrl)
    : undefined;
}

  

  ngOnInit(): void {
    // Starte ersten Video
    this.loadVideo('Intro');
  }

  skipToEnd(): void {
    const video = this.videoPlayerRef.nativeElement;
    video.currentTime = video.duration - 0.1;
  }
  
  playVideo(): void {
    if (this.videoPlayerRef?.nativeElement) {
      const video = this.videoPlayerRef.nativeElement;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
          })
          .catch(error => {
            console.error('Fehler beim Abspielen:', error);
          });
      }
    }
  }

  loadVideo(videoId: string): void {
    const visitCount = (this.visitCounter[videoId] || 0) + 1;
    this.visitCounter[videoId] = visitCount;

    // if (
    //   videoId === 'Intro' &&
    //   this.visitCounter['Angstraum_V2.1'] &&
    //   this.visitCounter['Angstraum_V2.2']
    // ) {
    //   videoId = 'Intro_v2'; // Überschreibt das Zielvideo
    // }

    // Spezialfall für "14.1-15.1"
  if (videoId === '9.3') {
    const visitedGroup1 = this.visitCounter['11.1.2'] || this.visitCounter['11.2.2'];
    const visitedGroup2 = this.visitCounter['12.A.A'] || this.visitCounter['12.B.A'];
    if (visitedGroup1 && visitedGroup2) {
      // Bedingungen erfüllt: Alternative Version laden
      // Hier kannst du entweder eine alternative Node-ID verwenden oder direkt
      // das Video-URL anpassen.
      videoId = '14.1-15.1';  // Angenommen, das hast du als alternativen Node definiert.
    }
  }
  
    // Hole den Node basierend auf videoId
    const node = this.videoNodes.find(n => n.id === videoId);
  
    if (!node) {
      console.error(`Kein VideoNode mit ID '${videoId}' gefunden`);
      return;
    }
  
    // Wenn  mind. das 2. Mal hier sind und es eine alternative Version gibt dann diese laden
    const finalVideoId = visitCount >= 2 && node.alternateVersionId
      ? node.alternateVersionId
      : videoId;
  
    // Hole den richtigen Node (Original oder Alternative)
    const finalNode = this.videoNodes.find(n => n.id === finalVideoId);
  
    if (!finalNode) {
      console.error(`Kein VideoNode mit ID '${finalVideoId}' gefunden`);
      return;
    }
  
    // Setze Node & spiele ab
    this.currentVideoNode = finalNode;
    this.showChoices = false;
    this.isVideoEnded = false;
    this.isPlaying = false;
  
    setTimeout(() => {
      const video = this.videoPlayerRef.nativeElement;
      video.load();
      this.playVideo();
    });
  }
  



  onVideoEnded(): void {
    this.isVideoEnded = true;
    // Zeige Auswahlmöglichkeiten nur, wenn welche vorhanden sind
    if (this.currentVideoNode?.choices && this.currentVideoNode.choices.length > 0) {
      this.showChoices = true;
    }
  }
  
  chooseOption(choice: VideoChoice): void {
    if (choice) {
      if (choice.notificationMessage) {
        this.showNotification(choice.notificationMessage);
      }
      this.loadVideo(choice.nextVideoId);
    }
  }

  showNotification(message: string): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Message', { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Message', { body: message });
          }
        });
      }
    }
  }
  

  onTimeUpdate(): void {
    const video = this.videoPlayerRef.nativeElement;
    const timeLeft = video.duration - video.currentTime;
    const buttoDelay = this.currentVideoNode?.showButtonBeforeEnd ?? 5;
  
    if (
      timeLeft <= buttoDelay && // 5 Sekunden vor Ende oder anzahl der sekunden per nodeübergabe 
      !this.showChoices && 
      !this.isVideoEnded &&
      this.currentVideoNode?.choices?.length
    ) {
      this.showChoices = true;
    }
  }

  
  
  
}